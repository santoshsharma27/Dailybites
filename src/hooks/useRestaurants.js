import { useEffect, useState, useCallback } from "react";
import { SWIGGY_API } from "../utils/constant";

// Simple cache map
const restaurantCache = {
  data: null,
  timestamp: null,
};

const useRestaurants = (retryLimit = 3) => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const extractRestaurants = (json) => {
    const cards = json?.data?.cards || [];
    for (const card of cards) {
      const restaurants =
        card?.card?.card?.gridElements?.infoWithStyle?.restaurants;
      if (restaurants) return restaurants;
    }
    return [];
  };

  const fetchRestaurants = useCallback(async () => {
    // If cached data exists, use it
    if (restaurantCache.data) {
      setRestaurants(restaurantCache.data);
      return;
    }

    setLoading(true);
    setError(null);

    let attempts = 0;

    const fetchWithRetry = async () => {
      try {
        const res = await fetch(SWIGGY_API);
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

        const json = await res.json();
        const data = extractRestaurants(json);

        restaurantCache.data = data;
        restaurantCache.timestamp = Date.now();
        setRestaurants(data);
      } catch (err) {
        attempts++;
        if (attempts < retryLimit) {
          console.warn(`Retrying fetch... (${attempts + 1})`);
          await fetchWithRetry();
        } else {
          setError("Failed to load restaurants. Please try again later.");
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };

    await fetchWithRetry();
  }, [retryLimit]);

  useEffect(() => {
    fetchRestaurants();
    window.scrollTo(0, 0);
  }, [fetchRestaurants]);

  return { restaurants, loading, error };
};

export default useRestaurants;
