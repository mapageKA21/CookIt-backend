'use strict';

const mongoose = require('mongoose');

const recipeSchema = {
  name: String,
  image_url: String,
  category: [{type: mongoose.Schema.ObjectId, ref: 'categories'}],
  ingredients: [{name: String, quantity: Number, unit: Number}],
  kit: [String],
  preparation: String,
  instructions: [String],
  serving: Array,
  servings: Number,
  difficulty: Number,
  time: Number,
  cost: Number
}

module.exports = mongoose.model('Recipe', recipeSchema);
