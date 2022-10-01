require('dotenv').config();
const { API_KEY } = process.env;
const { Diet, Recipe } = require('../../db')
const { Op } = require('sequelize');
const axios = require('axios');

const resumeDiets = (obj)=>{
    const {vegetarian, vegan, glutenFree} = obj;
        let head = {vegetarian, vegan, glutenFree}
        let alldiets = [];
        for(const prop in head){
            if(head[prop]){
                let flag = false;
                obj.diets.forEach(e =>{
                    if(prop === "glutenFree"){
                        if(e.includes("gluten")) flag = true
                    }
                    if(e === prop) flag = true
                });
                if(!flag) alldiets.push(prop)
            };
        }
        alldiets = [...alldiets, ...obj.diets];
        return alldiets;
};

const getNeeded = async function(name) {
    const apiSearch = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=25`);
    let array=[];
    if(name){
        array = apiSearch.data.results.filter(e => e.title.toLowerCase().includes(name.toLowerCase()));
    } else array = apiSearch.data.results;
    let response = [];
    for(let i=0; i<array.length;i++){
        const {title, id, healthScore, image} = array[i]
        let diets = resumeDiets(array[i])
        response.push({id, title, healthScore, diets, image})
    }
    return response;
};

const cleanSummary = function(summary){
    summary = summary+".";
    const first = summary.indexOf("score");
    const second = summary.indexOf(".",first);
    const finaltext = summary.slice(0,second);
    const woutobold = finaltext.split("<b>").join("");
    const woutcbold = woutobold.split("</b>").join("");
    const ref = woutcbold.indexOf("<")
    let response
    if(ref === -1 ) return woutcbold;
    else {
        let sec = woutcbold.indexOf(">", ref)
        let f = woutcbold.slice(0,ref)
        let s = woutcbold.slice(sec+1)
        let almost= f+s
        response = almost.split("</a>").join("");
    }
    return response;
}

const adjust = (recipe, details) =>{
    let diets = [];
    for(let diet of recipe.diets){
        diets.push(diet.name)
    };
    let cleanrecipe= {};
    if(details){
        cleanrecipe = {
            id: recipe.ID, 
            title: recipe.name, 
            summary: recipe.summary, 
            healthScore: recipe.healthScore, 
            steps: recipe.steps,
            diets,
            image: recipe.image,
        };
    } else {
        cleanrecipe = {
            id: recipe.ID, 
            title: recipe.name, 
            healthScore: recipe.healthScore, 
            diets,
            image: recipe.image,
        };
    }
    return cleanrecipe
};

const dbRecipes = async function(name) {
    let dbSearch = [];
    if(name){
        dbSearch = await Recipe.findAll({
            where:{name: {[Op.like]: `%${name}%`}},
            include: {
                model: Diet,
                attributes: ["name"],
                through:{
                    attributes: [],
                }
            }
        });
    } else {
        dbSearch = await Recipe.findAll({
            include: {
                model: Diet,
                attributes: ["name"],
                through:{
                    attributes: [],
                }
            }
        })
    };
    let response = [];
        for(let recp of dbSearch){
            response.push((adjust(recp)))
        };
    return response;
};

const searchById = async function(id){
    if(id.includes('RP')){
        const cid = id.slice(2);
        const recipe = await Recipe.findByPk(cid,{
            include:{
                model: Diet,
                attributes: ["name"],
                through:{
                    attributes: [],
                }
            }
        })
        const response = adjust(recipe, true);
        return response;
    } else {
        const idSearch = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
        if(!idSearch.data) return res.status(200).send("Sorry, We couldn't find that Recipe");
        const {title, healthScore, image, summary, analyzedInstructions} = idSearch.data;
        let steps = []
        if(analyzedInstructions.length>0){
            analyzedInstructions[0].steps.forEach(e => {
            steps.push(e.step)
        })}
        let tdiets = resumeDiets(idSearch.data);
        let cleansummary = cleanSummary(summary)
        const response = {id, title, healthScore, image, summary: cleansummary, diets: tdiets, steps};
        return response;
    }
};

const createRecipe = async function(title, healthScore, summary, steps, image, diets){
    let nwrecipe={};
    if(image === "") nwrecipe = await Recipe.create({name: title, healthScore, summary, steps})
    else nwrecipe = await Recipe.create({name: title, healthScore, summary, steps, image})
        for(let diet of diets){
            let dbDiet = await Diet.findOne({where: {name: diet}});
            await nwrecipe.addDiet(dbDiet.id);
        };
    return {message: "Your Recipe was successfully Created"};
}

const updateRecipe = async function(id, title, healthScore, summary, steps, image, diets){
    const cid = id.slice(2);
    const toUpdate = await Recipe.findByPk(cid,{
        include:{
            model: Diet,
            attributes: ["name"],
            through:{
                attributes: [],
            }
        }
    })
    await toUpdate.update({name: title, healthScore, summary, steps, image})
    await toUpdate.setDiets([])
    for(let diet of diets){
        let dbDiet = await Diet.findOne({where: {name: diet}});
        await toUpdate.addDiet(dbDiet.id);
    };
    return {message: "Your Recipe was successfully Updated"};
}

module.exports = {
    getNeeded,
    dbRecipes,
    searchById,
    createRecipe,
    updateRecipe
}