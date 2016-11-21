'use strict';

const http = require("http");
const request = require("request");
const scrapeIt = require("scrape-it");

// ADDED SOME SCRAP FUNCTIONS FOR DIFFERENTS SITES

let allRecipes = function (url) {
  scrapeIt(url, {
    instructions: ".directions--section__steps ol"
  }).then(page => {
    console.log('START');
    console.log(page);
    console.log('END');
  });
}

// allRecipes("http://allrecipes.com/recipe/17036/pumpkin-pancakes/");

let vicenzosPlate = function (url) {
  scrapeIt(url, {
    instructions: ".pf-content p",
    img: {
      selector: ".pf-content img",
      attr: "src"
    }
  }).then(page => {
    console.log('START');
    console.log(page);
    console.log('END');
  });
}

// vicenzosPlate("http://www.vincenzosplate.com/recipe-items/chicken-cacciatore/");

let liveLoveNourish = function (url) {
  scrapeIt(url, {
    instructions: ".recipe-content ol li"
  }).then(page => {
    console.log('START');
    console.log(page);
    console.log('END');
  });
}

// liveLoveNourish("http://www.livelovenourish.com.au/recipes-listing/italian-meatballs-with-fresh-tomato-sauce");

let redOnLine = function (url) {
  scrapeIt(url, {
    instructions: ".method--contents ul li span"
  }).then(page => {
    console.log('START');
    console.log(page);
    console.log('END');
  });
}

// redOnLine("http://www.redonline.co.uk/food/recipes/gordon-ramsay-s-italian-meatballs");

let tinnedTomatoes = function (url) {
  scrapeIt(url, {
    instructions: "#recbody ul li"
  }).then(page => {
    console.log('START');
    console.log(page);
    console.log('END');
  });
}

// tinnedTomatoes("http://www.tinnedtomatoes.com/2015/09/jamie-olivers-happiness-pasta-and.html");

