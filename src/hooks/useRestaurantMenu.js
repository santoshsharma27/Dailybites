import { useEffect, useState } from "react";
import { MENU_API } from "../utils/constant";

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMenu = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(MENU_API + resId);

      if (!res.ok) {
        throw new Error(`Failed to fetch. Status: ${res.status}`);
      }
      const json = await res.json();
      const data = json?.data;
      setResInfo(data);
    } catch (err) {
      console.error("Failed to get Restaurant Data", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, [resId]);

  return { resInfo, loading, error };
};

export default useRestaurantMenu;
