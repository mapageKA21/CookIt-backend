'use strict';

const Recipe = require('../models').models.Recipe;
const Category = require('../models').models.Category;
const axios = require("../lib/axios");

exports.getRecipes = function* (next) {
  this.type = 'json';
  let yummlyRecipes = [];

  try {
    const recipes = yield Recipe.find()
      .populate('categories');
    if (recipes.length > 10) {
      this.status = 200;
      this.body = {
        recipes: recipes
      };
    } else {
      let recipes = yield axios.get('/search', {
        params: { q: 'mediterranean'}
      }).then(function(res) {
        const matches = res.data.hits;
        for (let i = 0; i < matches.length; i++) {
          let newRecipe = {
            id: encodeURIComponent(matches[i].recipe.uri),
            name: matches[i].recipe.label,
            image_url: matches[i].recipe.image,
            ingredients: matches[i].recipe.ingredientLines,
            url: matches[i].recipe.url
          }
          yummlyRecipes.push(newRecipe);
        }
        return yummlyRecipes;
      });
      this.status = 200;
      this.body = recipes;
    }
  } catch (err) {
    this.status = 401;
    this.body = err;
  }
};

exports.getSpecificRecipe = function* (next) {
  this.type = 'json';
  const id = this.params.id;
  try {
    const recipe = yield Recipe.findOne({_id: id})
      .populate('categories');
    if (recipe._id) {
      this.status = 200;
      this.body = recipe;
    } else {
      
    }
  } catch (err) {
    if (err.name === 'CastError') {
      let recipes = yield axios.get(`/search`, {
        params: { r: id}
      }).then(function(res) {
        const recipe = res.data;
          let newRecipe = {
            id: id,
            name: recipe[0].label,
            image_url: recipe[0].image,
            ingredients: recipe[0].ingredientLines,
            calories: recipe[0].calories,
            url: recipe[0].url
          }
        return newRecipe;
      });
      this.status = 200;
      this.body = recipes;
    } else {
      this.status = 401;
      this.body = err;
    }
  }
};

exports.postRecipe = function* (next) {
  const that = this.request.body;
  const categoriesArr = this.request.body.categories;
  this.type = 'json';
  
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

    for (var i = 0; i < categoriesArr.length; i++) {
      let padre = yield Category.findOne({_id: categoriesArr[i]})
      padre.recipes.push(recipe)
    }

    yield recipe.save();
      this.status = 200;
      this.body = {
        recipe
      };
  } catch (err) {
    console.log('recipe not saved');
    this.status = 401;
    this.body = err;
  }
};
