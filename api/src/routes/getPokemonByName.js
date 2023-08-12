const { Pokemon, Type } = require('../db.js');
const axios = require('axios');
const { Op } = require('sequelize');

module.exports = async function getPokemonByName(req, res, next) {
  try {
    let { name } = req.query;
    name = name.toLowerCase();

    // Buscar el pokémon en la base de datos
    const dbPokemon = await Pokemon.findOne({
      where: {
        name: {
          [Op.iLike]: name,
        },
      },
    });

    if (dbPokemon) {
      // Si se encontró en la base de datos, devolverlo directamente
      res.json([{
        id: dbPokemon.id,
        api_id: dbPokemon.api_id,
        name: dbPokemon.name,
        type: dbPokemon.type,
        img: dbPokemon.img,
        hp: dbPokemon.hp,
        attack: dbPokemon.attack,
        defense: dbPokemon.defense,
        speed: dbPokemon.speed,
        height: dbPokemon.height,
        weight: dbPokemon.weight,
      }]);
    } else {
      // Si no se encontró en la base de datos, buscar en la API
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const pokemonDetails = response.data;

      const types = pokemonDetails.types.map(type => type.type.name);

      const apiPokemonData = {
        api_id: pokemonDetails.id,
        name: pokemonDetails.name,
        type: types,
        img: pokemonDetails.sprites.other["official-artwork"].front_default,
        hp: pokemonDetails.stats.find(stat => stat.stat.name === 'hp').base_stat,
        attack: pokemonDetails.stats.find(stat => stat.stat.name === 'attack').base_stat,
        defense: pokemonDetails.stats.find(stat => stat.stat.name === 'defense').base_stat,
        speed: pokemonDetails.stats.find(stat => stat.stat.name === 'speed').base_stat,
        height: pokemonDetails.height,
        weight: pokemonDetails.weight,
      };


      res.json([apiPokemonData]);
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.status(404).json({ message: "No existe un pokemon con ese nombre" });
    } else {
      next(error);
    }
  }
};
