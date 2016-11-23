'use strict';

const Recipe = require('../models').models.Recipe;
const axios = require("../lib/axios");

exports.getSuggestions = function* (next) {
  //  query of 3 ingredients
  this.type = 'json';
  let yummlyRecipes = [];
  
  try {
      let recipes = yield axios.get('/search', {
        params: { q: `${this.query.one},${this.query.two},${this.query.three}`}
      }).then(function(res) {
        const matches = res.data.hits;
        console.log(matches);
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
      this.body = {
        recipes: recipes
      };
    
  } catch (err) {
    console.log('no recipes matching search criteria');
    console.log(err);
    this.status = 401;
    this.body = err;
  }
};
