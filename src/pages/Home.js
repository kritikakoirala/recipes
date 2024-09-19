import React, { useEffect, useState } from "react";
import { cuisines } from "../helpers/cuisines";
import { Link } from "react-router-dom";
import { fetchRecipes } from "../helpers/api";

const apiKey = process.env.REACT_APP_RECIPES_API_KEY;

const Home = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [cuisine, setCuisine] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);

  const searchRecipes = async () => {
    // Function to fetch the recipes and set the loaders
    setLoading(true);
    try {
      const response = await fetchRecipes({ query, cuisine, page, apiKey });
      setRecipes(response?.data?.results);
      setTotalResults(response?.data?.totalResults);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    // Function to start the search when the "Search" button is clicked
    e.preventDefault();
    if (query.trim() !== "") {
      setPage(1); // Reset to first page on new search
      searchRecipes();
    }
  };

  useEffect(() => {
    // Call the function to search the recipes when a cuisine is selected/changed

    searchRecipes();
  }, [cuisine]);

  useEffect(() => {
    // Call the function to search the recipes when the page number is changed
    searchRecipes();
  }, [page]);

  return (
    <>
      <div className="container mt-5">
        <div className="text-center text-primary-color">
          <h1>Foodies</h1>
          <p className=" fst-italic">Good Food, Good Life!</p>
        </div>

        {/* Header section with filter/search/tags before the list of recipes section */}
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            {/* Header to show the filter and search bar section before all the recipes*/}
            <div className="header d-flex justify-content-between align-items-center border-bottom py-3">
              {/* Filter section containing all the supported cuisines  */}
              <div className="filter">
                <select
                  className="form-select"
                  onChange={(e) => setCuisine(e?.target?.value)}
                  defaultChecked={cuisine}
                >
                  <option value={""}>Select a cuisine</option>
                  {cuisines?.map((item, idx) => {
                    return (
                      <option value={item} key={idx}>
                        {item}
                      </option>
                    );
                  })}
                </select>
              </div>
              {/* Search bar where you can set a search query */}
              <div className="search">
                <form className="d-flex" onSubmit={handleSearch}>
                  <input
                    onKeyDown={(e) =>
                      e.key === "Enter" && setQuery(e?.target?.value)
                    }
                    onChange={(e) => setQuery(e?.target?.value)}
                    className="form-control me-2"
                    type="search"
                    placeholder="Search for recipes.."
                    aria-label="Search"
                  />
                  <button className="search-btn " type="submit">
                    Search
                  </button>
                </form>
              </div>
            </div>
            {/* Section to show the selected tags i.e. cuisines and query */}
            <div className="selected-tags mt-4">
              <SelectedTag tag={cuisine} />
              <SelectedTag tag={query} />
            </div>
          </div>
        </div>
        {loading ? (
          <Loader message={"Loading Recipes..."} />
        ) : recipes?.length == 0 ? (
          <div className="text-center mt-3">
            <h3>Search for delicious recipes!</h3>
            <p>Sorry, no match found with the searched keyword</p>
          </div>
        ) : (
          <>
            {/* The section that shows the list of recipes based on the cuisines selected and types search query*/}
            <div className="row">
              {recipes?.length > 0 &&
                recipes?.map((recipe, index) => {
                  return (
                    <div
                      className="col-lg-4 col-md-4 col-sm-12 gy-3"
                      key={index}
                    >
                      <div className="recipe text-center">
                        <img
                          src={recipe?.image}
                          alt={recipe?.title}
                          className="recipe-img"
                        />
                        <div className="recipe-footer rounded bg-secondary-color text-center pt-5">
                          <p className="fw-bold ">{recipe?.title}</p>
                          <Link
                            to={`${recipe?.id}/detail`}
                            className="bg-primary-color text-white text-decoration-none w-50 rounded text-center p-2 my-3 fs-8"
                          >
                            View Recipe
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* Pagination Section */}
            <div className="row my-4">
              <div>
                <Button
                  className="mx-2"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  Previous
                </Button>
                <span className="mx-2 fs-8">Page {page}</span>
                <Button
                  disabled={page * 5 >= totalResults}
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;

/**
 * Component to show the tags when used either as cuisine or typed in the search bar
 * @param {*} param0
 * @returns
 */
const SelectedTag = ({ tag }) => {
  return (
    tag !== "" && (
      <>
        <p className="position-relative badge border-primary-color text-black px-2 mx-2 text-capitalize ">
          {tag}
        </p>
      </>
    )
  );
};

/**
 * Reusable Button component
 * @param {*} param0
 * @returns
 */

const Button = ({
  children,
  className,
  disabled,
  onClick,
  type = "button",
}) => {
  return (
    <button
      type={type}
      className={`${className} ${
        disabled
          ? "disabled bg-gray border-1"
          : "border-primary-color text-primary-color "
      }  rounded bg-white fs-8`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

/**
 * Spinner Loaded used while displaying the recipes/recipe
 * @param {*} message to show the when the spinner is spinning
 * @returns
 */

export const Loader = ({ message }) => {
  return (
    <div className="text-center mt-3">
      <h4>{message}</h4>
    </div>
  );
};
