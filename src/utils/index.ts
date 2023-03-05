import PocketBase from "pocketbase";

export const pb = new PocketBase(import.meta.env.VITE_API_ROUTE);

export const setToLocalStorage = (value: any) => {
  if (window) {
    localStorage.setItem("token", value);
  }
};

export const getFromLocalStorage = () => {
  if (window) {
    return localStorage.getItem("token");
  }
  return null;
};

export const clearLocalStorage = () => {
  if (window) {
    localStorage.clear();
  }
};
