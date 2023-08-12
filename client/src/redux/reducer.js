import { CLEAN_POKEMON_BY_NAME, GET_ALL_POKEMONS, GET_POKEMON_BY_ID, GET_POKEMON_BY_NAME, GET_TYPES, LOAD_PAGINATED_POKEMONS } from "./actions";

const initialState = {
    pokemons: [],
    types: [],
    pokemonById: {},
    pokemonByName: [],
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
          pokemonByName: [],
        }

      case LOAD_PAGINATED_POKEMONS:
        return {
          ...state,
          paginatedPokemons: action.payload,
          currentPage: action.currentPage,
          totalPages: action.totalPages,
        }

      default:
        return state;
    }
  };
  
  export default reducer;