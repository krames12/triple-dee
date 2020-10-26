import styles from "../styles/RestaurantList.module.css"

const RestaurantList = ({restaurants}) => {
  return (
    <div className={styles["restaurant-list"]} >
      <h2>Restaurant List</h2>
      <ul className={styles.list}>
        {restaurants.length && restaurants.map(
          (name, index) => (
            <li 
              className={styles.item}
              key={index}
            >
              <h3 className={styles.title}>{name}</h3>
              <p className={styles.location}>Woodward Ave.</p>
              <p className={styles.description}>Bacon ipsum dolor amet meatloaf beef excepteur, porchetta est veniam corned beef shoulder turducken tongue nisi. Deserunt bacon velit shankle turducken, shoulder laboris. Excepteur officia boudin tail elit tenderloin, enim anim labore doner jowl laboris.</p>
            </li>
          )
        )}
      </ul>
    </div>
  )
}

export default RestaurantList;