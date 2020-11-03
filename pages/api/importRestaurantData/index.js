const faunadb = require("faunadb")
const q = faunadb.query
const restaurantData = require("../../../data/restaurant-info")

const serverClient = new faunadb.Client({ secret: process.env.FAUNA_SECRET })


module.exports = (request, response) => {
  const restaurants = restaurantData.default.restaurants.map(
    ({geometry, properties}) => {
      return {
        name: properties.Name,
        location: geometry.coordinates,
        season: properties.Season
      }
    }
  )

  restaurants.forEach( restaurant => {
    serverClient.query(
      q.Create(
        q.Collection('Restaurant'),
        { data: {...restaurant} }
      )
    )
    .then( ret => {
      console.log(`Successfully added ${restaurant.name}`)
      return;
    })
    .catch( error => {
      console.log(error)
      response.status(500).json(error)
    })
  })

  response.status(200).json(restaurants)
}