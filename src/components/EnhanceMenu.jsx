import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import SearchBar from "./SearchBar";
import Restaurants from "./restaurant/Restaurants";
import useOnline from "../hooks/useOnlineStatus";
import useRestaurants from "../hooks/useRestaurants";

const Menu = () => {
  const { restaurants: allRestaurants, loading, error } = useRestaurants();
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchError, setSearchError] = useState("");

  const isOnline = useOnline();

  // Sync filtered list when original list is updated
  useEffect(() => {
    setFilteredRestaurants(allRestaurants);
  }, [allRestaurants]);

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

  const filterTopRated = () => {
    window.scrollTo(0, 0);
    const topRatedRestaurants = allRestaurants.filter(
      (r) => r?.info?.avgRating > 4.3,
    );

    setFilteredRestaurants(topRatedRestaurants);
    setSearchText("");
    setSearchError(
      topRatedRestaurants.length === 0 ? "No top-rated restaurants found." : "",
    );
  };

  if (!isOnline) {
    return (
      <h1 className="m-10 p-10 text-center">
        Please check your internet connection.
      </h1>
    );
  }

  return (
    <div>
      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
        onSearch={handleSearch}
        onFilterTopRated={filterTopRated}
        onReset={() => {
          setFilteredRestaurants(allRestaurants);
          setSearchText("");
          setSearchError("");
        }}
      />

      {error && <p className="pt-10 text-center text-red-500">{error}</p>}

      {searchError && (
        <p className="pt-10 text-center text-red-500">{searchError}</p>
      )}

      {loading && !error ? (
        <Shimmer />
      ) : (
        <Restaurants restaurants={filteredRestaurants} />
      )}
    </div>
  );
};

export default Menu;
