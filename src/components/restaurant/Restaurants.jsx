import { useEffect, useState } from "react";
import Shimmer from "../Shimmer";
import SearchBar from "../SearchBar";
import useOnline from "../../hooks/useOnlineStatus";
import { SWIGGY_API } from "../../utils/constant";
import RestaurantCard from "./RestaurantCard";
import { Link } from "react-router-dom";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isTopRated, setIsTopRated] = useState(false);
  const [isVegOnly, setIsVegOnly] = useState(false);
  const [error, setError] = useState(null);
  const [searchError, setSearchError] = useState("");
  const [loading, setLoading] = useState(false);
  const isOnline = useOnline();

  // Fetch restaurants
  const fetchRestaurants = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(SWIGGY_API);
      if (!res.ok) throw new Error("Failed to fetch restaurants");
      const json = await res.json();
      const data = extractRestaurants(json);

      setRestaurants(data);
      setFilteredRestaurants(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load restaurants. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Extract restaurant list from Swiggy API
  const extractRestaurants = (json) => {
    const cards = json?.data?.cards || [];
    for (const card of cards) {
      const list = card?.card?.card?.gridElements?.infoWithStyle?.restaurants;
      if (list) return list;
    }
    return [];
  };

  // Initial fetch
  useEffect(() => {
    fetchRestaurants();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let data = [...restaurants];

    if (isTopRated) {
      data = data.filter((r) => r?.info?.avgRating > 4.5);
    }

    if (isVegOnly) {
      data = data.filter((r) => r?.info?.veg);
    }

    if (searchText.trim()) {
      data = data.filter((r) =>
        r?.info?.name?.toLowerCase().includes(searchText.toLowerCase()),
      );
    }

    setFilteredRestaurants(data);
    setSearchError(
      data.length === 0 ? "No restaurants found matching your filters." : "",
    );
  }, [restaurants, searchText, isTopRated, isVegOnly]);

  // oggle handlers (STATE ONLY)
  const handleTopRatedToggle = (enabled) => {
    setIsTopRated(enabled);
    window.scrollTo(0, 0);
  };

  const handleVegOnlyToggle = (enabled) => {
    setIsVegOnly(enabled);
    window.scrollTo(0, 0);
  };

  // Offline state
  if (!isOnline) {
    return (
      <h1 className="m-10 p-10 text-center">
        Please check your internet connection.
      </h1>
    );
  }

  if (error) {
    return <p className="pt-32 text-center text-red-500">{error}</p>;
  }

  return (
    <div>
      {/* Search + Filters */}
      <SearchBar
        onLoading={loading}
        searchText={searchText}
        setSearchText={setSearchText}
        isTopRated={isTopRated}
        isVegOnly={isVegOnly}
        onFilterTopRated={handleTopRatedToggle}
        onFilterVegOnly={handleVegOnlyToggle}
      />

      {/* Content */}
      {loading ? (
        <Shimmer />
      ) : (
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 pt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredRestaurants.length > 0 ? (
            filteredRestaurants.map((restaurant) => (
              <Link
                key={restaurant?.info?.id}
                to={`/restaurants/${restaurant?.info?.id}`}
                className="flex justify-center"
              >
                <RestaurantCard resData={restaurant?.info} />
              </Link>
            ))
          ) : (
            <p className="col-span-full pt-32 text-center text-red-500">
              {searchError}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Restaurants;
