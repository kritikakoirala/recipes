import axios from "axios";

export const base_url = "https://api.spoonacular.com/recipes";

export const instance = axios.create({
  // Configuration
  baseURL: base_url,
  headers: {
    Accept: "application/json",
  },
});
