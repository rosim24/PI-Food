export const GET_RECIPES = "GET_RECIPES";
export const GET_DIETS = "GET_DIETS";
export const FILTER_BY_DIET = "FILTER_BY_DIET";

export const getRecipes = () => dispatch => {
    return fetch('http://localhost:3001/recipes')
        .then(r => r.json())
        .then(recipes => dispatch({type: GET_RECIPES, payload: recipes}))
}

export const getDiets = () => dispatch => {
    return fetch('http://localhost:3001/diets')
        .then(r => r.json())
        .then(diets => dispatch({type: GET_DIETS, payload: diets}))
}

export const filterByDiet = (diet) => {
    return { type: FILTER_BY_DIET, payload: diet}
}