const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const mwrecipes = require('./recipes');
const mwdiets = require('./diets');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipes',mwrecipes);
router.use('/diets', mwdiets);

module.exports = router;
