/* eslint-disable react/prop-types */
import { CDN_URL } from "../../utils/constant";

const RestaurantCard = ({ resData }) => {
  const { cloudinaryImageId, name, cuisines, avgRating, sla, locality } =
    resData;

  return (
    <div className="m-4 flex w-full max-w-[300px] transform flex-col rounded-lg p-4 transition-all duration-300 ease-in-out hover:scale-105 sm:max-w-[300px] lg:max-w-[320px]">
      <img
        className="h-[200px] w-full rounded-xl object-cover sm:h-[180px] md:h-[200px]"
        src={CDN_URL + cloudinaryImageId}
        alt={name}
        loading="lazy"
      />
      <h3 className="pt-3 text-lg font-semibold text-gray-800">{name}</h3>

      <div className="mt-auto flex items-center justify-start text-sm">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-white">
          <span>✭</span>
        </span>

        <span className="px-1 py-1">{avgRating}</span>
        <h4 className="px-1 font-bold text-gray-600">•</h4>
        <h4 className="px-1 font-bold text-gray-600">{sla?.slaString}</h4>
      </div>
      <div>
        <h4 className="truncate text-sm text-gray-500">
          {cuisines.join(", ")}
        </h4>
        <h4 className="truncate text-sm text-gray-500">{locality}</h4>
      </div>
    </div>
  );
};

export default RestaurantCard;
