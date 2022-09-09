const { Router } = require('express');
const { Diet, Recipe } = require('../db')
const router = Router();
const utils = require('./functions/recipe');

router.get('/', async(req, res)=>{
    const {name} = req.query;
    try {
        const fromApi = await utils.getNeeded(name);
        const fromDB = await utils.dbRecipes(name);
        const allRecipes = [...fromApi,...fromDB]
        if(allRecipes.length>0) res.status(200).json(allRecipes);
        else res.status(200).send("Sorry, We couldn't find any Recipe");        
    } catch (error) {
        res.status(400).send(error)
    }
});

router.get('/:id', async (req, res)=>{
    const {id} = req.params;
    try {
        const recipeById = await utils.searchById(id);
        res.status(200).json(recipeById);
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/', async (req, res) =>{
    try {
        const {title, healthScore, summary, steps, image, diets} = req.body;
        const nwrecipe = await Recipe.create({name: title, healthScore, summary, steps, image})
        for(let diet of diets){
            let dbDiet = await Diet.findOne({where: {name: diet}});
            await nwrecipe.addDiet(dbDiet.id);
        };
        res.status(201).send("Your Recipe was successfully Created");
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router;