'use strict';

const Recipe = require('../models').models.Recipe;

exports.getSearchRecipes = function* (next) {
console.log('this params:' + this.params.id);
  this.type = 'json';
	try {
		const recipes = yield Recipe.find({name: new RegExp(this.params.id,"i")});
		this.status = 200;
    this.body = {
      recipes: recipes
    };
	} catch (err) {
		console.log('no recipes matching search criteria');
    this.status = 401;
    this.body = err;
  }
};
