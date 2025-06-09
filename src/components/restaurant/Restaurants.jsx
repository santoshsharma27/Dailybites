import { useEffect, useState } from "react";
import Shimmer from "../Shimmer";
import SearchBar from "../SearchBar";
import useOnline from "../../hooks/useOnlineStatus";
import { SWIGGY_API } from "../../utils/constant";
import RestaurantCard from "./RestaurantCard";
import { Link } from "react-router-dom";

const Restaurants = () => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState(null);
  const [searchError, setSearchError] = useState(null);
  const [loading, setLoading] = useState(false);

  const isOnline = useOnline();

  // Fetch restaurant data from API
  const fetchRestaurants = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(SWIGGY_API);
      if (!res.ok) throw new Error("Error fetching restaurants.");
      const json = await res.json();
      const restaurantData = extractRestaurants(json);
      setAllRestaurants(restaurantData);
      setFilteredRestaurants(restaurantData);
    } catch (error) {
      console.error("Fetch Error:", error);
      setError("Failed to load restaurants. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Extract restaurants from deeply nested API response
  const extractRestaurants = (json) => {
    let cards = json?.data?.cards || [];
    for (let card of cards) {
      const restaurants =
        card?.card?.card?.gridElements?.infoWithStyle?.restaurants;
      if (restaurants) return restaurants;
    }
    return [];
  };

  useEffect(() => {
    fetchRestaurants();
    window.scrollTo(0, 0);
  }, []);

  // Handle search input and filter matching restaurants
  const handleSearch = (value) => {
    window.scrollTo(0, 0);
    const text = value.trim().toLowerCase();
    setSearchText(value);

    if (!text) {
      setFilteredRestaurants(allRestaurants);
      setSearchError("");
      return;
    }

    const filtered = allRestaurants.filter((r) =>
      r?.info?.name?.toLowerCase().includes(text),
    );

    setFilteredRestaurants(filtered);
    setSearchError(
      filtered.length === 0
        ? "Oops! It seems there are no restaurants matching that name. Discover something new instead!"
        : "",
    );
  };

  // Filter top-rated restaurants
  const filterTopRated = () => {
    window.scrollTo(0, 0);
    const topRatedRestaurants = allRestaurants.filter(
      (r) => r?.info?.avgRating > 4.5,
    );
    setFilteredRestaurants(topRatedRestaurants);
    setSearchError(
      topRatedRestaurants.length === 0 ? "No top-rated restaurants found." : "",
    );
  };

  // Filter veg restaurants
  const filterVegOnly = () => {
    window.scrollTo(0, 0);
    const vegRestaurants = allRestaurants.filter((r) => r?.info?.veg === true);

    setFilteredRestaurants(vegRestaurants);
    setSearchError(
      vegRestaurants.length === 0 ? "No veg-only restaurants found." : "",
    );
  };

  // Show offline message if user is offline
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

  if (searchError) {
    return <p className="pt-32 text-center text-red-500">{searchError}</p>;
  }

  return (
    <div>
      {/* Search & filter bar */}
      <SearchBar
        onLoading={loading}
        searchText={searchText}
        setSearchText={setSearchText}
        onSearch={handleSearch}
        onFilterTopRated={filterTopRated}
        onFilterVegOnly={filterVegOnly}
        onReset={() => {
          setFilteredRestaurants(allRestaurants);
          setSearchText("");
          setSearchError("");
        }}
      />

      {loading && !error ? (
        <Shimmer />
      ) : (
        <div className="flex flex-wrap items-center justify-center pt-6">
          {filteredRestaurants?.length > 0 ? (
            filteredRestaurants.map((restaurant) => (
              <Link
                key={restaurant?.info.id}
                to={`/restaurants/${restaurant?.info?.id}`}
              >
                <RestaurantCard resData={restaurant?.info} />
              </Link>
            ))
          ) : (
            <p className="pt-32 text-center text-red-500">
              No restaurants available at the moment.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Restaurants;
