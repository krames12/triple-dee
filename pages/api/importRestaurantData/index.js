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

  serverClient.query(
    q.Map(restaurants, 
      q.Lambda(
        'restaurant_object',
        q.Create(
          q.Collection('Restaurant',
            { data: q.Var('restaurant_object')}
          )
        )
      )
    )
  )

  response.status(200).json(restaurants)
}