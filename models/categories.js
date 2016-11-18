'use strict';

const mongoose = require('mongoose');

const categorySchema = {
  name: String,
  recipes: [{type: mongoose.Schema.ObjectId, ref: 'recipes'}]
}

module.exports = mongoose.model('Category', categorySchema);
