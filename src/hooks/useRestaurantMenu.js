import { useEffect, useState, useCallback } from "react";
import { MENU_API } from "../utils/constant";

// Simple in-memory cache
const menuCache = new Map();

const useRestaurantMenu = (resId, retryLimit = 3) => {
  const [resInfo, setResInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMenu = useCallback(
    async (signal) => {
      if (!resId) return;

      // If cached, use it
      if (menuCache.has(resId)) {
        setResInfo(menuCache.get(resId));
        return;
      }

      setLoading(true);
      setError(null);

      let attempts = 0;

      const fetchWithRetry = async () => {
        try {
          const res = await fetch(MENU_API + resId, { signal });

          if (!res.ok) {
            throw new Error(`Failed to fetch. Status: ${res.status}`);
          }

          const json = await res.json();
          const data = json?.data;

          // Cache the result
          menuCache.set(resId, data);
          setResInfo(data);
        } catch (err) {
          if (err.name === "AbortError") return;

          attempts++;
          if (attempts < retryLimit) {
            console.warn(`Retrying... attempt ${attempts + 1}`);
            await fetchWithRetry();
          } else {
            console.error("Fetch failed after retries:", err);
            setError(err.message);
          }
        } finally {
          setLoading(false);
        }
      };

      await fetchWithRetry();
    },
    [resId, retryLimit],
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchMenu(controller.signal);

    return () => controller.abort();
  }, [fetchMenu]);

  return { resInfo, loading, error };
};

export default useRestaurantMenu;
