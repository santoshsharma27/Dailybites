import { useState } from "react";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../../hooks/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCateory";
import Loader from "../../ui/Loader";

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
      <h1 className="mb-2 text-2xl font-semibold md:text-xl lg:text-2xl">
        {name}
      </h1>
      <p className="flex items-center justify-center text-sm font-semibold md:text-base">
        <span className="mr-1 flex h-4 w-4 items-center justify-center rounded-full bg-green-600 text-white">
          <span className="text-sm">✭</span>
        </span>
        <span>{avgRating}</span>
        <span className="px-2 text-gray-400">•</span>
        <span>{costForTwoMessage}</span>
      </p>
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
