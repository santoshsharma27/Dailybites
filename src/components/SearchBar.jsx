/* eslint-disable react/prop-types */
import Toggle from "./Toggle";

const SearchBar = ({
  onLoading,
  searchText,
  setSearchText,
  isTopRated,
  isVegOnly,
  onFilterTopRated,
  onFilterVegOnly,
}) => {
  return (
    <div className="sticky top-20 z-40 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Search Input */}
          <div className="relative w-full md:max-w-md lg:max-w-lg">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search restaurants, cuisines, dishes..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full rounded-full border border-gray-300 py-3 pl-11 pr-4 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Toggles */}
          <div className="flex items-center gap-6">
            <Toggle
              label="⭐ Top Rated"
              enabled={isTopRated}
              disabled={onLoading}
              onChange={onFilterTopRated}
            />

            <Toggle
              label="🥦 Veg Only"
              enabled={isVegOnly}
              disabled={onLoading}
              onChange={onFilterVegOnly}
              activeColor="bg-green-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
