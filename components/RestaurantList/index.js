import StarRatings from '../StarRatings/index'

const RestaurantList = ({restaurants}) => {
  return (
    <div className="h-full w-2/5" >
      <ul className="overflow-y-scroll max-h-full">
        {restaurants.length && restaurants.map(
          ({name, rating, placeId}) => (
            <li 
              className="
                py-3 px-5 m-4 max-w-full 
                bg-teal-200 rounded-2xl
              "
              key={placeId}
            >
              <h3 className="text-left">{name}</h3>
              <StarRatings key={`${placeId}-${rating}`} rating={rating} />
            </li>
          )
        )}
      </ul>
    </div>
  )
}

export default RestaurantList;