'use strict';

const Recipe = require('../models').models.Recipe;

exports.getRecipes = function* (next) {
  this.type = 'json';
	try {
		const recipes = yield Recipe.find();
		if (recipes.length > 4) {
			this.status = 200;
	    this.body = {
	    	recipes: recipes
	    };
  	} else {
  		console.log(`less than 5 recipes, fetching data...`);
  	}
	} catch (err) {
		console.log(err);
    this.status = 401;
    this.body = err;
  }
};

exports.getSpecificRecipe = function* (next) {
  this.type = 'json';
	try {
		const id = this.params.id;
		const recipe = yield Recipe.findOne({_id: id});
			this.status = 200;
	    this.body = {
	    	recipes: recipe
	    };
	} catch (err) {
		console.log('recipe not found');
    this.status = 401;
    this.body = err;
  }
};

exports.postRecipe = function* (next) {
  this.type = 'json';
	try {
		let data = {name: this.request.body.name, image_url: this.request.body.image_url};
		let recipe = new Recipe (data);
		yield recipe.save();
			this.status = 200;
	    this.body = {
	    	recipes: data
	    };
	} catch (err) {
		console.log('recipe not saved');
    this.status = 401;
    this.body = err;
  }
};

// exports.login = function* (next) {
//   this.type = 'json';
//   try {
//     let auth = this.request.header.authorization.split(' ');
//     if (auth[0]==='Basic') {
//       auth = atob(auth[1]).split(':');
//       const user = yield User.findOne({username: auth[0]});
//       if (user === undefined || user.username === undefined) {
//         // User doesnt exist
//         throw new Error ('Wrong user or password.');
//       } else {
//         // user exists, let's check the password
//         let passOK = yield checkPass(auth[1], user.hash);
//         if (passOK) {
//           this.status = 200;
//           this.body = {
//             status: 'Authorized',
//             token: user.token,
//             username: user.username
//           };
//         } else {
//           throw new Error ('Wrong user or password.');
//         }
//       }
//       this.body = user;
//     } else {
//       throw new Error('No authentification header.')
//     }
//   } catch (err) {
//     this.status = 401;
//     this.body = err;
//   }
// };

// const checkPass = function(pass, hash) {
//   return new Promise(function(resolve,reject) {
//     bcrypt.compare(pass, hash, function (err, res) {
//       if (err) {
//         reject(err);
//       }
//       else if (res) {
//         resolve(true);
//       } else {
//         resolve(false);
//       }
//     });
//   });
// }

// exports.createUser = function* (next) {
//   this.type = 'json';
//   // if (
//   //   this.request.body === undefined ||
//   //   this.request.body.title === undefined ||
//   //   this.request.body.date === undefined ||
//   //   this.request.body.venue === undefined
//   // ) {
//   //   this.status = 400;
//   //   this.body = '400 Bad Request';
//   // } else {
//   //   let data = { title: this.request.body.title, date: this.request.body.date, venue: this.request.body.venue };
//   //   var event = new Event(data);
//   //   try {
//   //     yield event.save();
//   //     this.body = data;
//   //   } catch (err) {
//   //     this.status = 500;
//   //     this.body = err;
//   //   }
//   // }
// };