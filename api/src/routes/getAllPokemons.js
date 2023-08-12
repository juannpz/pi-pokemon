const { Pokemon, Type } = require('../db.js');
const axios = require('axios')

module.exports = async function getAllPokemons(req, res, next) {
  try {
    const { start, end } = req.query
    const parsedStart = parseInt(start)
    const parsedEnd = parseInt(end)

    const pokemonCount = await Pokemon.count()

    if (pokemonCount < 1000) {
      // Obtener todos los detalles de los pokémons de la API de Pokémon
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon', {
        params: {
          limit: 2000,
        },
      })

      const pokemonsFromAPI = response.data.results

      // Guardar los detalles de los pokémons en la base de datos si aún no están presentes
      for (const pokemon of pokemonsFromAPI) {
        const pokemonResponse = await axios.get(pokemon.url)
        const pokemonDetails = pokemonResponse.data

        const types = pokemonDetails.types.map((type) => type.type.name)

        await Pokemon.findOrCreate({
          where: { api_id: pokemonDetails.id },
          defaults: {
            name: pokemonDetails.name,
            type: types,
            img: pokemonDetails.sprites.other['official-artwork'].front_default,
            hp: pokemonDetails.stats.find((stat) => stat.stat.name === 'hp').base_stat,
            attack: pokemonDetails.stats.find((stat) => stat.stat.name === 'attack').base_stat,
            defense: pokemonDetails.stats.find((stat) => stat.stat.name === 'defense').base_stat,
            speed: pokemonDetails.stats.find((stat) => stat.stat.name === 'speed').base_stat,
            height: pokemonDetails.height,
            weight: pokemonDetails.weight,
          },
        })
      }
    }

    if (parsedStart >= 0 && parsedEnd >= 0 && parsedEnd > parsedStart && parsedEnd <= pokemonCount) {
      const dbPokemons = await Pokemon.findAll({
        offset: parsedStart,
        limit: parsedEnd - parsedStart + 1,
      })

      const allPokemons = dbPokemons.map((pokemon) => ({
        api_id: pokemon.api_id,
        name: pokemon.name,
        type: pokemon.type,
        img: pokemon.img,
        hp: pokemon.hp,
        attack: pokemon.attack,
        defense: pokemon.defense,
        speed: pokemon.speed,
        height: pokemon.height,
        weight: pokemon.weight,
      }))

      res.json(allPokemons)
    } else {
      res.status(400).json({ message: 'Pagination failed' })
    }
  } catch (error) {
    next(error)
  }
};
