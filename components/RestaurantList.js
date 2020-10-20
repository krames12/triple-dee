import styles from "../styles/RestaurantList.module.css"

const RestaurantList = () => {
  return (
    <div className={styles["restaurant-list"]} >
      <h2>Restaurant List</h2>
      <ul className={styles.list}>
        {["Bill's Tavern", "Tap Houz", "Bubba Gump Shrimp"].map(
          (name) => (
            <li className={styles.item}>
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