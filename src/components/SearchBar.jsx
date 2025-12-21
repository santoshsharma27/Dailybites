/* eslint-disable react/prop-types */

const SearchBar = ({
  onLoading,
  searchText,
  setSearchText,
  onFilterTopRated,
  onFilterVegOnly,
}) => {
  return (
    <div className="sticky top-20 z-40 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Toolbar */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Search Input */}
          <div className="relative w-full md:max-w-md lg:max-w-lg">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>
            <input
              aria-label="Search restaurants"
              type="text"
              placeholder="Search restaurants, cuisines, dishes..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full rounded-full border border-gray-300 bg-white py-3 pl-11 pr-4 text-sm shadow-sm transition focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              disabled={onLoading}
              onClick={onFilterTopRated}
              className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              ⭐ Top Rated
            </button>

            <button
              disabled={onLoading}
              onClick={onFilterVegOnly}
              className="rounded-full bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              🥦 Veg Only
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
