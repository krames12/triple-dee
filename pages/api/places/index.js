const { default: RestaurantList } = require("../../../components/RestaurantList");

const axios = require("axios");

module.exports = async (request, response) => {
  const {lng, lat} = request.query;

  const placesKey = process.env.googlePlaces;
  const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=15000&type=restaurant&key=${placesKey}`

  await axios.get(placesUrl)
    .then( response => {
      response.json(response)
      response.status(200).send;
    })
    .catch( error => {
      response.status(400).send(error);
    })
}