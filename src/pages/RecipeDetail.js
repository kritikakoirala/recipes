import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import { fetchRecipe } from "../helpers/api";
import { Loader } from "./Home";

const apiKey = process.env.REACT_APP_RECIPES_API_KEY;

const RecipeDetail = () => {
  const [recipe, setRecipe] = useState();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);

    // Funtion to fetch the recipe based on the id used
    const fetchRecipeDetail = async () => {
      try {
        const response = await fetchRecipe({ id, apiKey });
        setRecipe(response?.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetail();
  }, [id]);
  return (
    <>
      <div className="container my-5">
        <div className="row">
          {loading ? (
            <Loader message="Loading Recipe.." />
          ) : (
            <div className="col-lg-8 col-md-8 col-sm-12 mx-auto">
              {/* All the tags mentioned in relation to the recipe */}
              <div className="recipe-tags text-center">
                <Tags data={recipe?.dishTypes} />
              </div>

              {/* Header of the container that shows the misellaneous information of the recipe  */}
              <div className="recipe-card text-center">
                <img src={recipe?.image} className="recipe-thumbnail" />
                <div className="recipe-info">
                  <h3>{recipe?.title}</h3>

                  <div className="recipe-details bg-secondary-color  d-flex flex-wrap justify-content-around p-3 border-bottom">
                    <ExtraCookingDetails
                      readyInMinutes={recipe?.readyInMinutes}
                    />
                    <ExtraCookingDetails servings={recipe?.servings} />
                  </div>
                  <div className="d-flex flex-wrap justify-content-center  bg-secondary-color pt-3">
                    <p>Important Tags:</p>
                    <Tags data={recipe?.diets} />
                  </div>
                </div>
              </div>

              {/* Brief Summary of the recipe */}
              <div className="recipe-summary my-4">
                <p className="justify-content fs-8">
                  {recipe?.summary && parse(recipe?.summary)}
                </p>
              </div>
              {/* Ingrients used in the recipe */}
              <div className="ingredients ">
                <h4>Ingredients</h4>
                {recipe?.extendedIngredients?.map((ing, index) => {
                  return (
                    <>
                      <p>{ing?.original}</p>
                    </>
                  );
                })}
              </div>
              {/* Instruction to use the recipe */}
              <div className="instructions my-4">
                <h4>Instructions</h4>
                <ul class="list-group border-0">
                  {recipe?.analyzedInstructions?.map((ins, index) => {
                    return ins?.steps?.map((step, idx) => {
                      return (
                        <li class="border-0 list-group-item d-flex justify-content-start align-items-center ps-0">
                          <span class="badge bg-black text-white rounded-pill me-4">
                            {step?.number}
                          </span>
                          {step?.step}
                        </li>
                      );
                    });
                  })}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RecipeDetail;

/**
 * The Function that takes the recipe information and displays in a certain format
 * @param {*} data the minute information of the recipe such as total time taken to cook, prep time and etc
 * @returns a div that displays formated recipe information
 */
const ExtraCookingDetails = (data) => {
  return (
    <>
      {data &&
        Object?.keys(data)?.map((cookData) => {
          return (
            <div className="me-3">
              <span className="text-uppercase">
                {cookData && cookData?.replace(/([a-z])([A-Z])/g, "$1 $2")}:
              </span>
              <span>
                {" "}
                {data[cookData]} {cookData?.includes("Minutes") ? "min" : ""}
              </span>
            </div>
          );
        })}
    </>
  );
};

/**
 * Function to show the tags related to recipe
 * @param {*} data all the tags based on various type such as health information, dish types
 * @returns  formatted div that displays the tags
 */

const Tags = ({ data }) => {
  return (
    data?.length > 0 &&
    data?.map((item) => {
      return (
        <p className="badge bg-primary-color text-white px-2 mx-2 text-capitalize">
          {item}
        </p>
      );
    })
  );
};
