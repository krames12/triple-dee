const axios = require("axios");

async function getPlacesNearMe (url) {
  return await axios.get(url)
  .then( ({data}) => data )
  .catch( error => error)
}

module.exports = async (request, response) => {
  const {lng, lat, zoom} = request.query;

  // @TODO Figure out how to calculate the radius based on zoom level
  // const searchRadius = zoom * 583.333;

  const placesKey = process.env.GOOGLE_PLACES;
  const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=7000&type=restaurant&key=${placesKey}`

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
        placeId: restaurant.place_id,
        rating: restaurant.rating
      }
    })

    response.status(200).json(restaurantData)
  } catch(error) {
    response.status(400).json(error)
  }
}