import { Link } from "react-router-dom";
import RestaurantCard from "./RestaurantCard";

const Restaurants = ({ restaurants }) => {
  return (
    <div className="flex flex-wrap items-center justify-center pt-6">
      {restaurants?.length > 0 ? (
        restaurants.map((restaurant) => (
          <Link
            key={restaurant?.info.id}
            to={`/restaurants/${restaurant?.info?.id}`}
          >
            <RestaurantCard resData={restaurant?.info} />
          </Link>
        ))
      ) : (
        <p className="pt-10 text-center text-gray-500">
          No restaurants available at the moment.
        </p>
      )}
    </div>
  );
};

export default Restaurants;
