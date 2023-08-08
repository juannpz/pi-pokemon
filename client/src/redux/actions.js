import axios from "axios"

const GET_ALL_POKEMONS = "GET_ALL_POKEMONS"
const GET_POKEMON_BY_ID = "GET_POKEMONS_BY_ID"
const GET_TYPES = "GET_TYPES"

const getAllPokemons = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get("http://localhost:3001/pokemons");
            const pokemons = response.data;
            dispatch({ type: GET_ALL_POKEMONS, payload: pokemons });
          } catch (error) {
            dispatch({ type: GET_ALL_POKEMONS, payload: error.message });
          }
    }
}

const getPokemonById = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:3001/pokemons/${id}`);
      const pokemon = response.data;
      dispatch({ type: GET_POKEMON_BY_ID, payload: pokemon });
    } catch (error) {
      dispatch({ type: GET_POKEMON_BY_ID, payload: error.message });
    }
  }
}

const getTypes = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:3001/types')
      const types = response.data
      dispatch({ type: GET_TYPES, payload: types })
    } catch (error) {
      dispatch({ type: GET_TYPES, payload: error.message });
    }
  }
}

export {
    getAllPokemons,
    GET_ALL_POKEMONS,
    getPokemonById,
    GET_POKEMON_BY_ID,
    getTypes,
    GET_TYPES,
}