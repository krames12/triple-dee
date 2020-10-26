const axios = require("axios");

async function getPlacesNearMe (url) {
  return await axios.get(url)
  .then( ({data}) => data )
  .catch( error => error)
}

module.exports = async (request, response) => {
  const {lng, lat} = request.query;

  const placesKey = process.env.GOOGLE_PLACES;
  const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=15000&type=restaurant&key=${placesKey}`

  try {
    const placesRequest = await getPlacesNearMe(placesUrl);

    // Format data to my liking
    const restaurantData = placesRequest.results.map( restaurant => {
      return {
        name: restaurant.name,
        address: restaurant.vicinity,
        location: {
          lng: restaurant.geometry.location.lng,
          lat: restaurant.geometry.location.lat,
        },
        placeId: restaurant.placeId,
      }
    })

    response.status(200).json(restaurantData)
  } catch(error) {
    response.status(400).json(error)
  }
}