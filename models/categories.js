'use strict';

const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema ({
  // id: mongoose.Schema.ObjectId,
  name: String,
  recipes: [{type: mongoose.Schema.ObjectId, ref: 'Recipe'}]
});

module.exports = mongoose.model('Category', categorySchema);
