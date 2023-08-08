const { Pokemon, Type } = require('../db.js');
const axios = require('axios')


module.exports = async function getAllPokemons(req, res, next) {
  try {
    // Obtener los nombres de los pokémons de la API de Pokémon
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20');
    const pokemonsFromAPI = response.data.results//.sort(() => Math.random() - 0.5); <----- ordenar el array de manera aleatoria.

    // Crear un arreglo para almacenar los detalles de cada Pokémon con sus types
    const pokemonDetailsArr = [];

    // Obtener los detalles de cada Pokémon haciendo una solicitud a la API para cada uno
    for (const pokemon of pokemonsFromAPI) {
      const pokemonResponse = await axios.get(pokemon.url);
      pokemonDetailsArr.push(pokemonResponse.data);
    }

    // Mapear los detalles de los Pokémon para obtener la información que necesitamos, incluyendo los types
    const allPokemons = [];

    for (const pokemonDetails of pokemonDetailsArr) {
      const types = pokemonDetails.types.map((type) => type.type.name);

      const pokemonData = {
        api_id: pokemonDetails.id,
        name: pokemonDetails.name,
        api_types: types,
        img: pokemonDetails.sprites.front_default,
        hp: pokemonDetails.stats.find((stat) => stat.stat.name === 'hp').base_stat,
        attack: pokemonDetails.stats.find((stat) => stat.stat.name === 'attack').base_stat,
        defense: pokemonDetails.stats.find((stat) => stat.stat.name === 'defense').base_stat,
        speed: pokemonDetails.stats.find((stat) => stat.stat.name === 'speed').base_stat,
        height: pokemonDetails.height,
        weight: pokemonDetails.weight,
      };

      // Crear el Pokémon en la base de datos utilizando el método findOrCreate
      await Pokemon.findOrCreate({
        where: { api_id: pokemonData.api_id },
        defaults: pokemonData,
      });

      allPokemons.push(pokemonData);
    }

    res.json(allPokemons);
  } catch (error) {
    next(error);
  }
}
