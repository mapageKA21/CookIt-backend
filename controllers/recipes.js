'use strict';

const Recipe = require('../models').models.Recipe;
const Category = require('../models').models.Category;
const axios = require("../lib/axios");
const request = require("request");

exports.getRecipes = function* (next) {
  this.type = 'json';
  let yummlyRecipes = [];

  try {
    const recipes = yield Recipe.find()
      .populate('categories');
    if (recipes.length > 10) {
      this.status = 200;
      this.body = {
        recipes: recipes
      };
    } else {
      let recipes = yield axios.get('/recipes', {
        params: { q: '*'}
      }).then(function(res) {
        const matches = res.data.matches;
        for (let i = 0; i < 5; i++) {
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
    }
  } catch (err) {
    this.status = 401;
    this.body = err;
  }
};

exports.getSpecificRecipe = function* (next) {
  this.type = 'json';
  const id = this.params.id;
  try {
    const recipe = yield Recipe.findOne({_id: id})
      .populate('categories');
    if (recipe._id) {
      this.status = 200;
      this.body = {
        recipe: recipe
      };
    } else {
      
    }
  } catch (err) {
    if (err.name === 'CastError') {
      let recipes = yield axios.get(`/recipe/${id}?`)
      .then(function(res) {
        const recipe = res.data;
          let newRecipe = {
            id: id,
            name: recipe.name,
            image_url: recipe.images[0].hostedLargeUrl,
            ingredients: recipe.ingredientLines,
            time: recipe.totalTime,
            url: recipe.source.sourceRecipeUrl
          }
        return newRecipe;
      });
      this.status = 200;
      this.body = {
        recipes: recipes
      };
    }else{
      this.status = 401;
      this.body = err;
    }
  }
};

exports.postRecipe = function* (next) {
  const that = this.request.body;
  const categoriesArr = this.request.body.categories;
  this.type = 'json';
  
  try {
    let recipe = new Recipe ({
      name: that.name,
      image_url: that.image_url,
      categories: categoriesArr,
      ingredients: that.ingredients,
      kit: that.kit,
      preparation: that.preparation,
      instructions: that.instructions,
      serving: that.serving,
      servings: that.servings,
      difficulty: that.difficulty,
      time: that.time,
      cost: that.cost
    });

    for (var i = 0; i < categoriesArr.length; i++) {
      let padre = yield Category.findOne({_id: categoriesArr[i]})
      padre.recipes.push(recipe)
    }

    yield recipe.save();
      this.status = 200;
      this.body = {
        recipe
      };
  } catch (err) {
    console.log('recipe not saved');
    this.status = 401;
    this.body = err;
  }
};







// ADD FUNCTION TO GET ID AND FUNCTION TO GET THE DETAILS


let getOneIdRecipe = function (category, onResult) {
  let options = {
    host: `api.yummly.com`,
    path: `/v1/api/recipes?_app_id=4ce60515&_app_key=1bf26e0787bf475c706de80ec4b3b50d&q=${category}&requirePictures=true`,
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
  };
  console.log("rest::getOneIdRecipe");

  let req = http.request(options, function(res)
  {
      let output = '';
      console.log(options.host + ':' + res.statusCode);
      res.setEncoding('utf8');

      res.on('data', function (chunk) {
          output += chunk;
      });

      res.on('end', function() {
          let obj = JSON.parse(output);
          onResult(res.statusCode, obj);
      });
  });
  req.on('error', function(err) {
      //res.send('error: ' + err.message);
  });

  req.end();
}


let getDetailsRecipe = function (recipeId, onResult) {
  let options = {
    host: `api.yummly.com`,
    path: `/v1/api/recipe/${recipeId}?_app_id=4ce60515&_app_key=1bf26e0787bf475c706de80ec4b3b50d`,
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
  };
  console.log("rest::getDetailsRecipe");

  let req = http.request(options, function(res)
  {
      let output = '';
      console.log(options.host + ':' + res.statusCode);
      res.setEncoding('utf8');

      res.on('data', function (chunk) {
          output += chunk;
      });

      res.on('end', function() {
          let obj = JSON.parse(output);
          onResult(res.statusCode, obj);
      });
  });

  req.on('error', function(err) {
      //res.send('error: ' + err.message);
  });

  req.end();
}

// getOneIdRecipe('veal', function(statusCode, result) {
//   const recipeId = result.matches[3].id;
//   console.log(`RECIPE ID: ${recipeId}`);
//   getDetailsRecipe(recipeId, function(statusCode, result) {
//     console.log(`RECIPE DETAILS:`);
//     console.log("onResult: (" + statusCode + ")" + JSON.stringify(result));  
//     const recipeUrl = result.source.sourceRecipeUrl;
//     console.log(`RECIPE URL:${recipeUrl}`);
//   })
//   // I could work with the result html/json here.  I could also just return it
//   // console.log("onResult: (" + statusCode + ")" + JSON.stringify(result));
//   // res.statusCode = statusCode;
//   // res.send(result);
// });

// RECIPE URL:http://allrecipes.com/recipe/20670/veal-oscar/

let getInfoFromUrl = function (url) {
  let options = {
    host: `allrecipes.com`,
    path: `/recipe/20670/veal-oscar/`,
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
  };
  console.log("rest::getInfoFromUrl");

  let req = http.request(options, function(res) {
      let output = '';
      console.log(options.host + ':' + res.statusCode);
      res.setEncoding('utf8');

      res.on('data', function (chunk) {
          output += chunk;
      });

      res.on('end', function() {
          let obj = JSON.parse(output);
          onResult(res.statusCode, obj);
      });
  });

  req.on('error', function(err) {
      //res.send('error: ' + err.message);
  });

  req.end();
}



// request('http://api.yummly.com/v1/api/recipes?_app_id=4ce60515&_app_key=1bf26e0787bf475c706de80ec4b3b50d&q=veal&requirePictures=true', function (error, response, body) {
//   if (!error && response.statusCode == 200) {
//     console.log(body.facetCounts) // Show the HTML for the Google homepage.
//   }
// })


// FUNCIONA OK:
// const options = {
//   host: 'api.yummly.com',
//   path: '/v1/api/recipes?_app_id=4ce60515&_app_key=1bf26e0787bf475c706de80ec4b3b50d&q=*&requirePictures=true'
// };
// http.get(options, function(res) {
//   console.log('STATUS: ' + res.statusCode);
//   console.log('HEADERS: ' + JSON.stringify(res.headers));

//   // Buffer the body entirely for processing as a whole.
//   var bodyChunks = [];
//   res.on('data', function(chunk) {
//     // You can process streamed parts here...
//     bodyChunks.push(chunk);
//   }).on('end', function() {
//     var body = Buffer.concat(bodyChunks);
//     var parsed = JSON.parse(body);
//     JSON.stringify(parsed);
//     console.log(parsed.matches[0]);

//     // ...and/or process the entire body here.
//   }).on('error', function(e) {
//     console.log('ERROR: ' + e.message);
//   });
// });









