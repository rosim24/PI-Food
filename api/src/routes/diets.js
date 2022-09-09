const { Router } = require('express');
const { Diet } = require('../db')
const router = Router();
const utils = require('./functions/diet');

router.get('/', async (req, res)=>{
    try {
        const dbdiets = await Diet.findAll();
        if(dbdiets.length > 0) return res.status(200).json(dbdiets);
        else{
            const saved = await utils.loadDiets()
            res.status(200).json(saved);
        }
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router;