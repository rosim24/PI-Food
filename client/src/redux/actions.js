export const GET_RECIPES = "GET_RECIPES";
export const GET_DIETS = "GET_DIETS";
export const FILTER_BY_DIET = "FILTER_BY_DIET";
export const FILTER_BY_SOURCE = "FILTER_BY_SOURCE";
export const ORDER_RECIPES = "ORDER_RECIPES"
export const SEARCH_BY_NAME = "SEARCH_BY_NAME"
export const SEARCH_BY_ID = "SEARCH_BY_ID"
export const CREATE_RECIPE = "CREATE_RECIPE"
export const CLEAR_RECIPE = "CLEAR_RECIPE"
export const DELETE_RECIPE = "DELETE_RECIPE"
export const EDIT_RECIPE = "EDIT_RECIPE"

//const baseURL = 'http://localhost:3001/'
const baseURL = 'https://pi-back-production.up.railway.app/'


export const getRecipes = () => dispatch => {
    return fetch(`${baseURL}recipes`)
        .then(r => r.json())
        .then(recipes => dispatch({type: GET_RECIPES, payload: recipes}))
        .catch(error => console.log(new Error(error)));
}

export const getDiets = () => dispatch => {
    return fetch(`${baseURL}diets`)
        .then(r => r.json())
        .then(diets => dispatch({type: GET_DIETS, payload: diets}))
        .catch(error => console.log(new Error(error)));
}

export const searchByName = (name) => dispatch => {
    return fetch(`${baseURL}recipes?name=${name}`)
        .then(r => r.json())
        .then(recipes => dispatch({type: SEARCH_BY_NAME, payload: recipes}))
        .catch(error => console.log(new Error(error)));
}

export const searchById = (id) => dispatch => {
    return fetch(`${baseURL}recipes/${id}`)
        .then(r => r.json())
        .then(recipe => dispatch({type: SEARCH_BY_ID, payload: recipe}))
        .catch(error => console.log(new Error(error)));
}

export const clearRecipe = () => {
    return { type: CLEAR_RECIPE, payload: {}}
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

export const createRecipe = (recipe) => dispatch => {
    return fetch(`${baseURL}recipes`,{method: "POST", headers: {'Content-Type': 'application/json'}, body: JSON.stringify(recipe)})
            .then(r => r.json())
            .then(message => dispatch({type: CREATE_RECIPE, payload: message}))
            .catch(error => console.log(new Error(error)));
}

export const deleteRecipe = (id) => dispatch => {
    return fetch(`${baseURL}recipes/${id}`, {method: "DELETE"})
            .then(r => r.json())
            .then(message => dispatch({type: DELETE_RECIPE, payload: message}))
            .catch(error => console.log(new Error(error)));
}

export const editRecipe = (recipe) => dispatch => {
    return fetch(`${baseURL}recipes`,{method: "PUT", headers: {'Content-Type': 'application/json'}, body: JSON.stringify(recipe)})
            .then(r => r.json())
            .then(message => dispatch({type: EDIT_RECIPE, payload: message}))
            .catch(error => console.log(new Error(error)));
}