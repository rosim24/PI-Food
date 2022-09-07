require('dotenv').config();
const { API_KEY } = process.env;
const { Router } = require('express');
const { Diet, Recipe } = require('../db')
const router = Router();
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
}

const getNeeded = (array) =>{
    let response = [];
    for(let i=0; i<array.length;i++){
        const {title, id, healthScore, image} = array[i]
        let diets = resumeDiets(array[i])
        response.push({id, title, healthScore, diets, image})
    }
    return response;
}

const adjustdet = (recipe) =>{
    let diets = [];
    for(let diet of recipe.diets){
        diets.push(diet.name)
    };
    const cleanrecipe = {
        id: recipe.ID, 
        title: recipe.name, 
        summary: recipe.summary, 
        healthScore: recipe.healthScore, 
        steps: recipe.steps,
        diets,
        image: recipe.image,
    };
    return cleanrecipe
}

const adjust = (recipe) =>{
    let diets = [];
    for(let diet of recipe.diets){
        diets.push(diet.name)
    };
    const cleanrecipe = {
        id: recipe.ID, 
        title: recipe.name, 
        healthScore: recipe.healthScore, 
        diets,
        image: recipe.image,
    };
    return cleanrecipe
}

router.get('/', async(req, res)=>{
    const {name} = req.query;
    const apiSearch = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
    if(!name){
        const fromApi = getNeeded(apiSearch.data.results);
        const dbSearch = await Recipe.findAll({
            include: {
                model: Diet,
                attributes: ["name"],
                through:{
                    attributes: [],
                }
            }
        })
        let fromDB = [];
        for(let recp of dbSearch){
            fromDB.push((adjust(recp)))
        }
        const allRecipes = [...fromApi,...fromDB]
        res.status(200).json(allRecipes);
    }else{
        const filtered = apiSearch.data.results.filter(e => e.title.includes(name))
        const fromApi = getNeeded(filtered);
        const dbSearch = await Recipe.findAll({
            where:{name: {[Op.like]: `%${name}%`}},
            include: {
                model: Diet,
                attributes: ["name"],
                through:{
                    attributes: [],
                }
            }
        });
        let fromDB = [];
        for(let recp of dbSearch){
            fromDB.push((adjust(recp)))
        }
        const allRecipes = [...fromApi,...fromDB]
        if(allRecipes.length>0) res.status(200).json(allRecipes);
        else res.status(200).send("No se encontro una Receta")
    }  
});

router.get('/:id', async (req, res)=>{
    const {id} = req.params;
    if(id.includes('RP')){
        const cid = id.slice(3);
        const recipe = await Recipe.findByPk(cid,{
            include:{
                model: Diet,
                attributes: ["name"],
                through:{
                    attributes: [],
                }
            }
        })
        const dbrecipe = adjustdet(recipe);
        res.status(200).json(dbrecipe);
    }else{
        const idSearch = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
        if(!idSearch.data) return res.status(200).send("No se encontro la Receta");
        const {title, healthScore, image, summary, analyzedInstructions} = idSearch.data;
        let steps = []
        analyzedInstructions[0].steps.forEach(e => {
            steps.push(e.step)
        })
        let tdiets = resumeDiets(idSearch);
        const recipebyId = {id, title, healthScore, image, summary, tdiets, steps};
        res.status(200).json(recipebyId);
    }
})

router.post('/', async (req, res) =>{
    const {title, healthScore, summary, steps, image, diets} = req.body;
    const nwrecipe = await Recipe.create({name: title, healthScore, summary, steps, image})
    for(let diet of diets){
        let dbDiet = await Diet.findOne({where: {name: diet}});
        await nwrecipe.addDiet(dbDiet.id);
    };
    res.status(201).send("Se creo una Nueva Receta");
})

module.exports = router;