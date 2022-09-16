import { GET_RECIPES, GET_DIETS, FILTER_BY_DIET } from "./actions";

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
      case FILTER_BY_DIET:{
        let filtered = [];
        action.payload === "All" ? filtered=state.allRecipes :
        filtered = state.allRecipes.filter(e =>e.diets.includes(action.payload))
        return {...state, recipes: filtered}
      }
      /*case CREATE_RECIPE:{
        return {...state, houses: [...state.houses, action.payload]}
      }
      case GET_RECIPE_BY_ID:{
        return{
          ...state,
          houses: state.houses.filter(house => house.id !== action.payload),
        }
      }*/
      default: return state
     
  };
};

export default reducer;