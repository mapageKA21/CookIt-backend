'use strict';

const Recipe = require('../models').models.Recipe;
const axios = require("../lib/axios");

exports.getSearchRecipes = function* (next) {
  this.type = 'json';
  const id = this.params.id;
  let yummlyRecipes = [];

	try {
		const recipes = yield Recipe.find({name: new RegExp(id,"i")});
		if (recipes.length > 0) {
      this.status = 200;
      this.body = {
        recipes: recipes
      };
    } else {
      let recipes = yield axios.get('/search', {
        params: { q: `${id}`}
      }).then(function(res) {
        const matches = res.data.hits;
        for (let i = 0; i < 10; i++) {
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
    }
	} catch (err) {
		console.log('no recipes matching search criteria');
    this.status = 401;
    this.body = err;
  }
};
