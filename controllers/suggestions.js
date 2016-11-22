'use strict';

const Recipe = require('../models').models.Recipe;
const axios = require("../lib/axios");

exports.getSuggestions = function* (next) {
  this.type = 'json';
  let yummlyRecipes = [];

  try {
      let recipes = yield axios.get('/recipes', {
        params: { 
          q: `*`,
          allowedIngredient: `${this.query.one}`,
          allowedIngredient: `${this.query.two}`,
          allowedIngredient: `${this.query.three}`
        }
      }).then(function(res) {
        const matches = res.data.matches;
        for (let i = 0; i < 3; i++) {
          let newRecipe = {
            id: matches[i].id,
            name: matches[i].recipeName,
            image_url: matches[i].imageUrlsBySize['90'],
            time: Math.ceil(matches[i].totalTimeInSeconds/60)
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
