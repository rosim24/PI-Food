import { GET_RECIPES, GET_DIETS, FILTER_BY_DIET,FILTER_BY_SOURCE, ORDER_RECIPES, SEARCH_BY_NAME, SEARCH_BY_ID, CREATE_RECIPE} from "./actions";

const initialState = {
    diets: [],
    recipes: [],
    allRecipes: [],
    recipe: {},
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
      case GET_DIETS:{
        return {...state, diets: action.payload}
      }
      case GET_RECIPES:{
        return {...state, recipes: action.payload, allRecipes: action.payload}
      }
      case SEARCH_BY_NAME:{
        return {...state, recipes: action.payload}
      }
      case SEARCH_BY_ID: {
        return {...state, recipe: action.payload}
      }
      case FILTER_BY_DIET:{
        let filtered = [];
        action.payload === "All" ? filtered=state.allRecipes :
        filtered = state.allRecipes.filter(e =>e.diets.includes(action.payload))
        return {...state, recipes: filtered}
      }
      case FILTER_BY_SOURCE:{
        let filtered = [];
        if(action.payload === "all") filtered=state.allRecipes;
        else{
        action.payload === "db" ? filtered = state.allRecipes.filter((r) => isNaN(r.id)) :
        filtered = state.allRecipes.filter((r) => !isNaN(r.id))
        }
        return {...state, recipes: filtered}
      }
      case ORDER_RECIPES:{
        if(action.payload === "asc"){
          state.recipes.sort(function(a,b){
            if(a.title > b.title) return 1
            else if(b.title > a.title) return -1
            else return 0
          })
        } else if(action.payload === "desc"){
          state.recipes.sort(function(a,b){
            if(a.title > b.title) return -1
            else if(b.title > a.title) return 1
            else return 0
          })
        } else if(action.payload === "fit"){
          state.recipes.sort(function(a,b){
            return b.healthScore - a.healthScore
          })
        } else if(action.payload === "fat"){
          state.recipes.sort(function(a,b){
            return a.healthScore - b.healthScore
          })
        }
        break;
      }
      case CREATE_RECIPE:{
        return state
      }
      default: return state;
  };
};

export default reducer;