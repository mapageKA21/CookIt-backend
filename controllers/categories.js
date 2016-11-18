'use strict';

const Category = require('../models').models.Category;

exports.getCategories = function* (next) {
  this.type = 'json';	try {
		const categories = yield Category.find();
			this.status = 200;
	    this.body = {
	    	id: categories[0]._id,
	    	name: categories[0].name
	    };
	} catch (err) {
    this.status = 401;
    this.body = err;
  }
};

exports.getSpecificCategory = function* (next) {
  this.type = 'json';
	try {
		const id = this.params.id;
		const category = yield Category.findOne({_id: id});
			this.status = 200;
	    this.body = {
	      id: category.id,
	      name: category.name,
	      recipes: category.recipes
	    };
	} catch (err) {
    this.status = 401;
    this.body = err;
  }
};
