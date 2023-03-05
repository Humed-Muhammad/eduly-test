import { useEffect, useState } from "react";
import { getFromLocalStorage } from "..";

export const useAuthCheck = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const token = getFromLocalStorage();

  useEffect(() => {
    if (token) {
      setAuthenticated(true);
    }
  }, [token]);

  return { authenticated };
};
