/* eslint-disable react/prop-types */
import { CDN_URL } from "../../utils/constant";

const RestaurantCard = ({ resData }) => {
  const { cloudinaryImageId, name, cuisines, avgRating, sla, locality } =
    resData;

  return (
    <div className="group flex w-full flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:w-[280px] md:w-[300px] lg:w-[320px]">
      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <img
          src={CDN_URL + cloudinaryImageId}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col px-4 py-3">
        <h3 className="line-clamp-1 text-base font-semibold text-gray-800 md:text-lg">
          {name}
        </h3>

        {/* Rating & Time */}
        <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-xs text-white">
            ★
          </span>
          <span className="font-medium">{avgRating}</span>
          <span className="text-gray-400">•</span>
          <span className="font-medium">{sla?.slaString}</span>
        </div>

        {/* Cuisine & Locality */}
        <div className="mt-2 text-sm text-gray-500">
          <p className="line-clamp-1">{cuisines.join(", ")}</p>
          <p className="line-clamp-1">{locality}</p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
