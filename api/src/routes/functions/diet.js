require('dotenv').config();
const { API_KEY } = process.env;
const { Diet } = require('../../db')
const axios = require('axios');

module.exports = {
    loadDiets: async function(){
        const apiSearch = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=25`);
        const arr = apiSearch.data.results;
        await Diet.create({name: "vegetarian"});
        for(let ele of arr){
            for(let diet of ele.diets){
                await Diet.findOrCreate({
                    where: {name: diet}
                })
            }
        }
        const allDiets = await Diet.findAll();
        return allDiets;
    }
}