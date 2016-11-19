'use strict';

const Recipe = require('../models').models.Recipe;
const Category = require('../models').models.Category;

exports.getRecipes = function* (next) {
  this.type = 'json';
  try {
    const recipes = yield Recipe.find()
      .populate('categories');
    if (recipes.length > 4) {
      this.status = 200;
      this.body = {
        recipes: recipes
      };
    } else {
      console.log(`less than 5 recipes, fetching data...`);
    }
  } catch (err) {
    console.log(err);
    this.status = 401;
    this.body = err;
  }
};

exports.getSpecificRecipe = function* (next) {
  this.type = 'json';
  try {
    const id = this.params.id;
    const recipe = yield Recipe.findOne({_id: id})
      .populate('categories');
      this.status = 200;
      this.body = {
        recipe: recipe
      };
  } catch (err) {
    console.log('recipe not found');
    this.status = 401;
    this.body = err;
  }
};

exports.postRecipe = function* (next) {
  //works with just one category
  const that = this.request.body;
  const categoriesArr = this.request.body.categories;
  const oneCat = this.request.body.categories;
  this.type = 'json';
  let padre = yield Category.findOne({_id: oneCat})
  try {
    let recipe = new Recipe ({
      name: that.name,
      image_url: that.image_url,
      categories: categoriesArr,
      ingredients: that.ingredients,
      kit: that.kit,
      preparation: that.preparation,
      instructions: that.instructions,
      serving: that.serving,
      servings: that.servings,
      difficulty: that.difficulty,
      time: that.time,
      cost: that.cost
    });
    recipe.categories.push(padre)
    yield recipe.save();
      this.status = 200;
      this.body = {
        recipe
      };
  } catch (err) {
    console.log(err);
    console.log('recipe not saved');
    this.status = 401;
    this.body = err;
  }
};
