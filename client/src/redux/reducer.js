import { CLEAN_POKEMON_BY_NAME, GET_ALL_POKEMONS, GET_POKEMON_BY_ID, GET_POKEMON_BY_NAME, GET_TYPES } from "./actions";

const initialState = {
    pokemons: [],
    types: [],
    pokemonById: {},
    pokemonByName: null,
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

      case GET_POKEMON_BY_ID:
        return {
          ...state,
          pokemonById: action.payload,
        }

      case GET_POKEMON_BY_NAME:
        return {
          ...state,
          pokemonByName: action.payload,
        }

      case CLEAN_POKEMON_BY_NAME:
        return {
          ...state,
          pokemonByName: null
        }

      default:
        return state;
    }
  };
  
  export default reducer;