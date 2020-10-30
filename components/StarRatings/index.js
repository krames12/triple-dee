import styles from "./StarRatings.module.css"

const StarRatings = ({rating}) => (
  <div className="flex">
    <div className="flex mt-2 mb-4">
      {[1, 2, 3, 4, 5].map((number) => 
        rating >= number ? (
        <svg key={`${rating}${number}`} className={`${styles["rating-star"]} text-yellow-500`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
      ) : (
        <svg className={`${styles["rating-star"]} text-gray-400`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
      )
      )}
    </div>
  </div>
)

export default StarRatings

