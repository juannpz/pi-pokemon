const { Pokemon, Type } = require('../db.js');
const axios = require('axios')

module.exports = async function getAllPokemons(req, res, next) {
  try {
    const { start, end } = req.query
    const parsedStart = parseInt(start)
    const parsedEnd = parseInt(end)

    const pokemonCount = await Pokemon.count()

    if (pokemonCount < 1000) {
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
    
      const dbPokemons = await Pokemon.findAll({
        offset: parsedStart,
        limit: parsedEnd - parsedStart + 1,
      })
      res.json(dbPokemons)
  } catch (error) {
    next(error)
  }
};
