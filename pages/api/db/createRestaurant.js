const faunadb = require("faunadb")
const q = faunadb.query

const serverClient = new faunadb.Client({ secret: process.env.FAUNA_SECRET })

module.exports = async (request, response) => {
  // Test example
  const testRestaurants = [
    {
      name: "Testaurant",
      location: {
        lng: -85.5940777, 
        lat: 42.2200136
      },
      season: "4"
    },
    {
      name: "Mestaurant",
      location: {
        lng: -85.5940777, 
        lat: 42.2200136
      },
      season: "2"
    },
    {
      name: "Bestaurant",
      location: {
        lng: -85.5940777, 
        lat: 42.2200136
      },
      season: "3"
    },
    {
      name: "Testaurant Two Electric Boogaloo",
      location: {
        lng: -85.5940777, 
        lat: 42.2200136},
      season: "15"
    }
  ]

  testRestaurants.forEach( restaurant => {
    serverClient.query(
      q.Create(
        q.Collection('Restaurant'),
        { 
          data: {
            ...restaurant,
          } 
        }
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

  response.status(200).send("Yup, it worked!")
  // Sad attempt at using the Lambda to create A LOT OF ENTRIES
  // serverClient.query(
  //   q.Map(testRestaurants, 
  //     q.Lambda(
  //       'restaurant' ,
  //       q.Create(
  //         q.Collection('Restaurant',
  //           { 
  //              ...q.Var('restaurant'),
  //           }
  //         )
  //       )
  //     )
  //   )
  // )
}