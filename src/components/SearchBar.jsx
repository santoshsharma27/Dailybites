/* eslint-disable react/prop-types */
import { useEffect } from "react";

const SearchBar = ({
  onLoading,
  searchText,
  setSearchText,
  onSearch,
  onFilterTopRated,
  onFilterVegOnly,
  onReset,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchText);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchText]);

  return (
    <div className="flex flex-col items-center justify-center space-y-4 pt-20 sm:flex-row sm:space-x-4 sm:space-y-0">
      <div className="flex w-full justify-center px-4 sm:w-auto sm:px-0">
        <input
          aria-label="Search restaurants"
          className="w-full max-w-[90%] rounded-full border border-solid px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-orange-400 sm:w-[350px]"
          type="text"
          placeholder="Search restaurants..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <div className="flex space-x-4">
        <button
          disabled={onLoading}
          onClick={onFilterTopRated}
          className="rounded-full bg-gray-100 px-6 py-3 font-semibold text-gray-800 transition-colors duration-300 ease-in-out hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          Top Rated Restaurants
        </button>
        <button
          disabled={onLoading}
          onClick={onFilterVegOnly}
          className="btn rounded-full bg-green-600 px-6 py-3 text-white hover:bg-green-500"
        >
          Veg Only
        </button>
        <button
          disabled={onLoading}
          onClick={onReset}
          className="rounded-full bg-gray-100 px-6 py-3 font-semibold text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          Reset Filter
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
