'use strict';

const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema ({
  name: String,
  recipes: [{type: mongoose.Schema.ObjectId, ref: 'Recipe'}]
});

module.exports = mongoose.model('Category', categorySchema);
