import { useState } from "react";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../../hooks/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import Loader from "../../components/Loader";

const RestaurantMenu = () => {
  const [curOpen, setCurOpen] = useState(0);
  const { resId } = useParams();
  const { resInfo, loading, error } = useRestaurantMenu(resId);

  // Show loader while loading
  if (loading) return <Loader />;

  // Show error message if there's an error
  if (error) return <p className="text-red-500">{error}</p>;

  // Check if resInfo is available
  if (!resInfo) return <p>No menu available.</p>;

  const { name, costForTwoMessage, avgRating } =
    resInfo?.cards[2]?.card?.card?.info || {};

  // Extract categories from the API response
  const categories =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (category) =>
        category.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory",
    );

  return (
    <div className="m-5 pt-24 text-center">
      <div className="mx-auto max-w-xl rounded-xl border border-gray-300 bg-white p-4 shadow-sm">
        <h1 className="mb-2 text-2xl font-bold text-gray-800">{name}</h1>
        <div className="flex items-center justify-center text-sm font-medium text-gray-600">
          <div className="mr-3 flex items-center space-x-1 rounded-full bg-green-600 px-2 py-1 text-white">
            <span>✭</span>
          </div>
          <span>{avgRating}</span>
          <span className="p-2 text-gray-400">•</span>
          <span>{costForTwoMessage}</span>
        </div>
      </div>

      <div className="mt-4 space-y-4">
        {categories?.map((category, index) => (
          <RestaurantCategory
            curOpen={curOpen}
            onOpen={setCurOpen}
            menu={category?.card?.card}
            num={index}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
