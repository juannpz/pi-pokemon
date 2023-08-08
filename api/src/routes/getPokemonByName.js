const { Pokemon, Type } = require('../db.js');
const axios = require('axios')
const { Op } = require('sequelize')

module.exports = async function getPokemonByName(req, res, next) {
  try {
    let { name } = req.query;
    name = name.toLowerCase()

    const dbPokemons = await Pokemon.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });

    if (dbPokemons.length > 0) {
      const allPokemons = dbPokemons.map((pokemon) => ({
        api_id: pokemon.api_id,
        name: pokemon.name,
        api_types: pokemon.api_types,
        img: pokemon.img,
        hp: pokemon.hp,
        attack: pokemon.attack,
        defense: pokemon.defense,
        speed: pokemon.speed,
        height: pokemon.height,
        weight: pokemon.weight,
      }));
      res.json(allPokemons)
    } else {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      const pokemonDetails = response.data;

      const types = pokemonDetails.types.map((type) => type.type.name)

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

      await Pokemon.create(pokemonData)
      res.json([pokemonData])
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.status(404).json({ message: "No existe un pokemon con ese nombre" })
    } else {
      next(error)
    }
  }
}