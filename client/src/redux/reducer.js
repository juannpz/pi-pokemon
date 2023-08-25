import { ACTIONS_TYPES } from "./actions"

const initialState = {
    pokemons: [],
    types: [],
    pokemonById: {},
    pokemonByName: [],
    filteredPokemons: [],
    lastRendered: []
  }
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case ACTIONS_TYPES.GET_ALL_POKEMONS:
        return {
          ...state,
          pokemons: action.payload,
        }

      case ACTIONS_TYPES.GET_TYPES:
        return {
          ...state,
          types: action.payload,
        }

      case ACTIONS_TYPES.GET_POKEMON_BY_ID:
        return {
          ...state,
          pokemonById: action.payload,
        }

      case ACTIONS_TYPES.GET_POKEMON_BY_NAME:
        return {
          ...state,
          pokemonByName: action.payload,
        }

      case ACTIONS_TYPES.CLEAN_POKEMON_BY_NAME:
        return {
          ...state,
          pokemonByName: [],
        }

      case ACTIONS_TYPES.GET_FILTERED_POKEMONS:
        return {
          ...state,
          filteredPokemons: action.payload,
          pokemons: action.payload,
        }

      case ACTIONS_TYPES.CLEAN_FILTERED_POKEMONS:
        return {
          ...state,
          filteredPokemons: [],
        }

      case ACTIONS_TYPES.FILL_LAST_RENDERED:
        return {
          ...state,
          lastRendered: action.payload
        }
      

      default:
        return state
    }
  }
  
  export default reducer