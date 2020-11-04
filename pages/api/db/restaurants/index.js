const restaurants = require("../../../../graphql/restaurants")

module.exports = async (request, response) => {
  const allRestaurants = await restaurants.getAllRestaurants(request.query);

  // response.status(500).json(allRestaurants.errorMessage) :
  response.status(200).json(allRestaurants);
  // .then( ret => response.status(200).json(ret.data))
  // .catch( error => response.status(500).json(error))
}