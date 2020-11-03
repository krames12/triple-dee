import fetchHelper from "../helpers/fetchHelper";

// get all restaurants
export const getAllRestaurants = async (params) => {
  const query = `query GetAllRestaurants($size: Int) {
      allRestaurants(_size: $size) {
        data {
          _id
          name
          location
          description
          rating
          season
        }
      }
    }
  `

  const size = 900
  const { data, error } = await fetchHelper(process.env.FAUNA_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.FAUNA_SECRET}`,
      'Content-type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: { size },
    }),
  })

  return {
    allRestaurants: data.allRestaurants.data,
    error,
  }
}

// get all restaurants within a certain area