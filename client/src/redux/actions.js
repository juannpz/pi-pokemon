import axios from "axios"

const BASE_URL = 'http://localhost:3001/'

const ACTIONS_TYPES = {
   GET_ALL_POKEMONS : "GET_ALL_POKEMONS",
   GET_POKEMON_BY_ID : "GET_POKEMON_BY_ID",
   GET_POKEMON_BY_NAME : "GET_POKEMON_BY_NAME",
   GET_TYPES : "GET_TYPES",
   CLEAN_POKEMON_BY_NAME : "CLEAN_POKEMON_BY_NAME",
   GET_FILTERED_POKEMONS : "GET_FILTERED_POKEMONS",
   CLEAN_FILTERED_POKEMONS : "CLEAN_FILTERED_POKEMONS",
}

const getAllPokemons = (start, end) => {
  return async (dispatch) => {
      try {
          const response = await axios.get("http://localhost:3001/pokemons", {
              params: {
                  start: start,
                  end: end
              }
          })
          const pokemons = response.data
          dispatch({ type: ACTIONS_TYPES.GET_ALL_POKEMONS, payload: pokemons })
      } catch (error) {
          dispatch({ type: ACTIONS_TYPES.GET_ALL_POKEMONS, payload: error.message })
      }
  }
}

const getPokemonById = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${BASE_URL}pokemons/${id}`)
      const pokemon = response.data
      dispatch({ type: ACTIONS_TYPES.GET_POKEMON_BY_ID, payload: pokemon })
    } catch (error) {
      dispatch({ type: ACTIONS_TYPES.GET_POKEMON_BY_ID, payload: error.message })
    }
  }
}

const getPokemonByName = (name) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:3001/pokemons/name?name=${name}`)
      const pokemon = response.data
      dispatch({ type: ACTIONS_TYPES.GET_POKEMON_BY_NAME, payload: pokemon })
    } catch (error) {
      dispatch({ type: ACTIONS_TYPES.GET_POKEMON_BY_NAME, payload: error.message })
    }
  }
}

const getTypes = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:3001/types')
      const types = response.data
      dispatch({ type: ACTIONS_TYPES.GET_TYPES, payload: types })
    } catch (error) {
      dispatch({ type: ACTIONS_TYPES.GET_TYPES, payload: error.message })
    }
  }
}

const cleanPokemonByName = () => {
  return {
    type: ACTIONS_TYPES.CLEAN_POKEMON_BY_NAME
  }
}

const getFilteredPokemons = (start, end, filteredBy, value) => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3001/pokemons/filteredBy", {
        params: {
            start: start,
            end: end,
            filteredBy: filteredBy,
            value: value
        }
    })
      const filteredPokemons = response.data
      dispatch({ type: ACTIONS_TYPES.GET_FILTERED_POKEMONS, payload: filteredPokemons })
    } catch (error) {
      dispatch({ type: ACTIONS_TYPES.GET_ALL_POKEMONS, payload: error.message })
    }
  }
}

const cleanFilteredPokemons = () => {
  return {
    type: ACTIONS_TYPES.CLEAN_FILTERED_POKEMONS
  }
}

export {
    getAllPokemons,
    getPokemonById,
    getPokemonByName,
    getTypes,
    cleanPokemonByName,
    getFilteredPokemons,
    cleanFilteredPokemons,
    ACTIONS_TYPES,
}