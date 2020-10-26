import styles from "../styles/RestaurantList.module.css"

const RestaurantList = ({restaurants}) => {
  return (
    <div className={styles["restaurant-list"]} >
      <h2>Restaurant List</h2>
      <ul className={styles.list}>
        {restaurants.length && restaurants.map(
          ({name, address}, index) => (
            <li 
              className={styles.item}
              key={index}
            >
              <h3 className={styles.title}>{name}</h3>
              <p className={styles.location}>{address}</p>
            </li>
          )
        )}
      </ul>
    </div>
  )
}

export default RestaurantList;