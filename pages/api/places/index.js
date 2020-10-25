const { default: RestaurantList } = require("../../../components/RestaurantList");

const axios = require("axios");

module.exports = async (request, response) => {
  const {lng, lat} = request.query;

  const placesKey = process.env.googlePlaces;
  const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lng},${lat}&radius=1500&type=restaurant&key=${placesKey}`

  await axios.get(placesUrl)
    .then( response => {
      response.json(response)
      response.status(200).send({hi: "tesxt"});

    })
    .catch( error => {
      response.status(400).send(error);
    })
}