const faunadb = require("faunadb")
const q = faunadb.query

const serverClient = new faunadb.Client({ secret: process.env.FAUNA_SECRET })

module.exports = async (request, response) => {
  // Test example
  const testRestaurants = [
    {
      name: "Testaurant",
      location: [-85.5940777, 42.2200136],
      season: 4
    },
    {
      name: "Mestaurant",
      location: [-85.5940777, 42.2200136],
      season: 2
    },
    {
      name: "Bestaurant",
      location: [-85.5940777, 42.2200136],
      season: 3
    },
    {
      name: "Testaurant Two Electric Boogaloo",
      location: [-85.5940777, 42.2200136],
      season: 15
    }
  ]

  // serverClient.query(
  //   q.Create(
  //     q.Collection('Restaurant'),
  //     { data: {...testRestaurant} }
  //   )
  // )
  serverClient.query(
    q.Map(testRestaurants, 
      q.Lambda(
        ['restaurant_object'],
        q.Create(
          q.Collection('Restaurant',
            { data: {...q.Var('restaurant_object')},
            }
          )
        )
      )
    )
  )
  .then( ret => {
    console.log(ret)
    response.status(200).json(ret)
  })
  .catch( error => {
    console.log(error)
    response.status(500).json(error)
  })
}