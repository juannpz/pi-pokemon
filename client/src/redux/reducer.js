import { GET_ALL_POKEMONS, GET_TYPES } from "./actions";

const initialState = {
    pokemons: [],
    types: [],
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ALL_POKEMONS:
        return {
          ...state,
          pokemons: action.payload,
        }

      case GET_TYPES:
        return {
          ...state,
          types: action.payload,
        }

      default:
        return state;
    }
  };
  
  export default reducer;