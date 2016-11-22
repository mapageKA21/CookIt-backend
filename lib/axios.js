const axios = require("axios")

const instance = axios.create({
	baseURL: 'https://api.yummly.com/v1/api',
})

instance.defaults.params = {
	"_app_id": "4ce60515",
	"_app_key":"1bf26e0787bf475c706de80ec4b3b50d",
	"requirePictures": true
}

module.exports = instance