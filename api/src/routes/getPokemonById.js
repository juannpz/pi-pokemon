const { Pokemon } = require('../db.js')
const axios = require('axios')


module.exports = async function getPokemonById(req, res, next) {
    try {
      const { idPokemon } = req.params
  

      let pokemon = await Pokemon.findOne({
        where: {
          id: idPokemon,
        },
      })
  
      if (!pokemon) {

        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`)
        const pokemonDetails = response.data
  

        const types = pokemonDetails.types.map((type) => type.type.name)

        pokemon = {
          api_id: pokemonDetails.id,
          name: pokemonDetails.name,
          type: types,
          img: pokemonDetails.sprites.other["official-artwork"].front_default,
          hp: pokemonDetails.stats.find((stat) => stat.stat.name === 'hp').base_stat,
          attack: pokemonDetails.stats.find((stat) => stat.stat.name === 'attack').base_stat,
          defense: pokemonDetails.stats.find((stat) => stat.stat.name === 'defense').base_stat,
          speed: pokemonDetails.stats.find((stat) => stat.stat.name === 'speed').base_stat,
          height: pokemonDetails.height,
          weight: pokemonDetails.weight,
        }
  

      }
  
      res.json(pokemon)
    } catch (error) {
      if (error.response && error.response.status === 404) {
        res.status(404).json({ message: "No existe un pokemon con ese ID" })
      } else {
        next(error)
      }
    }
  }