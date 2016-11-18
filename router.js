'use strict';

const router = require('koa-router')();
const bodyParser = require('body-parser');

const usersCtrl   = require('./controllers/users.js');
const recipesCtrl = require('./controllers/recipes.js');
const categoriesCtrl = require('./controllers/categories.js');
const searchCtrl = require('./controllers/search.js');

const authMiddleware = require('./auth.js')

router.get('/login', usersCtrl.login);
router.post('/login', usersCtrl.createUser);

router.get('/recipes', recipesCtrl.getRecipes);
router.post('/recipes', recipesCtrl.postRecipe);
router.get('/recipes/:id', recipesCtrl.getSpecificRecipe);

router.get('/search/:id', searchCtrl.getSearchRecipes);

router.get('/categories', categoriesCtrl.getCategories);
router.get('/categories/:id', categoriesCtrl.getSpecificCategory);



// router.get('/panels', authMiddleware, panelsCtrl.getPanels);
// router.post('/panels', authMiddleware, panelsCtrl.createMockPanel);

module.exports = router;
