'use strict';

const router = require('koa-router')();
const bodyParser = require('body-parser');

const usersCtrl   = require('./controllers/users.js');
const recipesCtrl = require('./controllers/recipes.js');
const categoriesCtrl = require('./controllers/categories.js');
const searchCtrl = require('./controllers/search.js');

<<<<<<< HEAD
const authMiddleware = require('./auth.js')

router.get('/sign-in', usersCtrl.login);
router.post('/users', usersCtrl.createUser);
router.get('/me',usersCtrl.checkUser);
router.del('/me',usersCtrl.delUser);

router.get('/recipes', recipesCtrl.getRecipes);
router.post('/recipes', recipesCtrl.postRecipe);
router.get('/recipes/:id', recipesCtrl.getSpecificRecipe);

router.get('/search/:id', searchCtrl.getSearchRecipes);

router.get('/categories', categoriesCtrl.getCategories);
router.get('/categories/:id', categoriesCtrl.getSpecificCategory);

module.exports = router;
