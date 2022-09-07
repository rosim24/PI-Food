require('dotenv').config();
const { API_KEY } = process.env;
const { Router } = require('express');
const { Diet } = require('../db')
const router = Router();
const { Op } = require('sequelize');
const axios = require('axios');

router.get('/', async (req, res)=>{
    const dbdiets = await Diet.findAll();
    if(dbdiets.length > 0) return res.status(200).json(dbdiets);
    else{
        const apiSearch = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
        const arr = apiSearch.data.results;
        await Diet.create({name: "vegetarian"});
        for(let ele of arr){
            for(let diet of ele.diets){
                await Diet.findOrCreate({
                    where: {name: diet}
                })
            }
        }
        const saved = await Diet.findAll();
        res.status(200).json(saved);
    }
})

module.exports = router;