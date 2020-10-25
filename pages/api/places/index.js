const axios = require("axios");

async function getPlacesNearMe (url) {
  console.log("inside getPlaces");
  await axios.get(url)
  .then( response => response.data )
  .catch( error => error)
}

module.exports = async (request, response) => {
  const {lng, lat} = request.query;

  const placesKey = process.env.GOOGLE_PLACES;
  const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=15000&type=restaurant&key=${placesKey}`

  try {
    const placesRequest = await getPlacesNearMe(placesUrl);
    await console.log(placesRequest)
    response.status(200).json(placesRequest)
  } catch(error) {
    response.status(400).json(error)
  }
}