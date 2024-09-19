import { instance, base_url } from "../config/config.js";
/**
 * This api fetches all the matched recipes based on the parameters passed
 *
 * @param apiKey secret key used for authorization
 * @param query the query typed in the search bar
 * @param cuisine the cuisine selected from the dropdown button
 * @param number limit on number of results fetched
 * @param offset The number of results to skip
 *
 *  */
export const fetchRecipes = async ({ query, cuisine, page, apiKey }) => {
  return instance(`${base_url}/complexSearch`, {
    params: {
      apiKey,
      query,
      cuisine,
      number: 5,
      offset: (page - 1) * 5,
    },
  });
};

/**
 * This api fetches the recipe based on the id passed
 *
 * @param apiKey secret key used for authorization
 * @param id id of the recipe to be fetched
 *
 *  */

export const fetchRecipe = async ({ id, apiKey }) => {
  return instance(`${id}/information`, {
    params: {
      apiKey,
    },
  });
};
