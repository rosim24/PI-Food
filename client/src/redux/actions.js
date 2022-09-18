export const GET_RECIPES = "GET_RECIPES";
export const GET_DIETS = "GET_DIETS";
export const FILTER_BY_DIET = "FILTER_BY_DIET";
export const FILTER_BY_SOURCE = "FILTER_BY_SOURCE";
export const ORDER_RECIPES = "ORDER_RECIPES"
export const SEARCH_BY_NAME = "SEARCH_BY_NAME"

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

export const searchByName = (name) => dispatch => {
    return fetch(`http://localhost:3001/recipes?name=${name}`)
        .then(r => r.json())
        .then(recipes => dispatch({type: SEARCH_BY_NAME, payload: recipes}))
}

export const filterByDiet = (diet) => {
    return { type: FILTER_BY_DIET, payload: diet}
}

export const filterBySource = (source) => {
    return { type: FILTER_BY_SOURCE, payload: source}
}

export const orderRecipes = (order) => {
    return { type: ORDER_RECIPES, payload: order}
}