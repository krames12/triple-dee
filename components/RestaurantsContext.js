import { createContext } from 'react';

const RestaurantsContext = createContext({
  locationData: {
    lng: -83.0671,
    lat: 42.3529,
  },
  restaurants: [],
});

export default RestaurantsContext;