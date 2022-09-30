const { Router } = require('express');
const { Diet, Recipe } = require('../db')
const router = Router();
const utils = require('./functions/recipe');
const failure = [{id: 0, title:"Sorry, we couldn't find what you're looking for", healthScore: 0, image:"https://us.123rf.com/450wm/belchonock/belchonock1910/belchonock191003408/130919481-ajuste-de-la-tabla-elegante-sobre-fondo-de-m%C3%A1rmol-gris-endecha-plana.jpg?ver=6" }]

router.get('/', async(req, res)=>{
    const {name} = req.query;
    try {
        const fromApi = await utils.getNeeded(name);
        const fromDB = await utils.dbRecipes(name);
        const allRecipes = [...fromApi,...fromDB]
        if(allRecipes.length>0) res.status(200).json(allRecipes);
        else res.status(200).json(failure);        
    } catch (error) {
        res.status(400).json(error)
    }
});

router.get('/:id', async (req, res)=>{
    const {id} = req.params;
    try {
        const recipeById = await utils.searchById(id);
        res.status(200).json(recipeById);
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
})

router.post('/', async (req, res) =>{
    try {
        const {title, healthScore, summary, steps, image, diets} = req.body;
        if(title && summary){
        const result = await utils.createRecipe(title, healthScore, summary, steps, image, diets)
        res.status(201).json(result);
        } else res.status(400).json({message: "Something went wrong, Please try again"});
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/:id', async (req, res) =>{
    const {id} = req.params;
    const cid = id.slice(2);
    try {
        await Recipe.destroy({where: {id: cid}})
        res.status(200).json({message: "The Recipe was successfully Deleted"})
    } catch (error) {
        res.status(400).send(error)
    }
})

router.put('/', async (req, res) =>{
    try {
        const {id, title, healthScore, summary, steps, image, diets} = req.body;
        if(id && title && summary){
            const result = await utils.updateRecipe(id, title, healthScore, summary, steps, image, diets)
            res.status(201).json(result);
            } else res.status(400).json({message: "Something went wrong, Please try again"});
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router;