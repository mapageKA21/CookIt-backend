'use strict';

const mongoose = require('mongoose');
const relationship = require('mongoose-relationship');

const recipeSchema = new mongoose.Schema ({
  // id: mongoose.Schema.ObjectId,
  name: String,
  image_url: String,
  categories: [{type: mongoose.Schema.ObjectId, ref: 'Category', childPath: 'recipes'}],
  ingredients: [{name: String, quantity: Number, unit: Number}],
  kit: [String],
  preparation: String,
  instructions: [String],
  serving: Array,
  servings: Number,
  difficulty: Number,
  time: Number,
  cost: Number
});

recipeSchema.plugin(relationship, {relationshipPathName:'categories'});
module.exports = mongoose.model('Recipe', recipeSchema);
