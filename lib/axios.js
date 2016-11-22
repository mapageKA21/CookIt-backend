const axios = require("axios")

const instance = axios.create({
	baseURL: 'https://api.edamam.com',
})

instance.defaults.params = {
	"app_id": "7a62165d",
	"app_key":"9216217c40300d649d0af281c9e3a877"
}

module.exports = instance