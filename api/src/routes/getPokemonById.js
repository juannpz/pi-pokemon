const { Pokemon, Type } = require('../db.js');
const axios = require('axios')


module.exports = async function getPokemonById(req, res, next) {
    try {
      const { idPokemon } = req.params;
  
      // Buscar el pokémon en la base de datos por su ID numérico (api_id)
      let pokemon = await Pokemon.findOne({
        where: {
          api_id: idPokemon,
        },
      });
  
      if (!pokemon) {
        // Si el pokémon no se encuentra en la base de datos, buscarlo en la API de Pokémon
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`);
        const pokemonDetails = response.data;
  
        // Obtener los types del Pokémon desde la API
        const types = pokemonDetails.types.map((type) => type.type.name);
  
        // Crear un objeto con los atributos que vamos a guardar en la base de datos
        const pokemonToCreate = {
          api_id: pokemonDetails.id,
          name: pokemonDetails.name,
          api_types: types,
          img: pokemonDetails.sprites.front_default,
          hp: pokemonDetails.stats.find((stat) => stat.stat.name === 'hp').base_stat,
          attack: pokemonDetails.stats.find((stat) => stat.stat.name === 'attack').base_stat,
          defense: pokemonDetails.stats.find((stat) => stat.stat.name === 'defense').base_stat,
          speed: pokemonDetails.stats.find((stat) => stat.stat.name === 'speed').base_stat,
          height: pokemonDetails.height,
          weight: pokemonDetails.weight, // Agregar los types al objeto pokemonToCreate
        };
  
        // Crear el pokémon en la base de datos
        pokemon = await Pokemon.create(pokemonToCreate);
      }
  
      res.json(pokemon);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        res.status(404).json({ message: "No existe un pokemon con ese ID" });
      } else {
        next(error);
      }
    }
  }