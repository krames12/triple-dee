import StarRatings from '../StarRatings/index'

const RestaurantList = ({restaurants}) => {
  return (
    <div className="
      w-full h-32 absolute bottom-0 mb-24 
      md:h-full md:w-2/5 md:relative md:mb-0
    ">
      <ul className="
        overflow-x-scroll max-h-full flex
        md:overflow-y-scroll md:overflow-x-auto md:block
      ">
        {restaurants.length && restaurants.map(
          ({name, rating, placeId}) => (
            <li 
              className="
                py-3 px-5 m-4 max-w-full
                bg-white rounded-2xl
              "
              key={placeId}
            >
              <p className="text-left">{name}</p>
              <StarRatings key={`${placeId}-${rating}`} rating={rating} />
            </li>
          )
        )}
      </ul>
    </div>
  )
}

export default RestaurantList;