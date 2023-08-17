const { Pokemon, Type } = require('../db.js')
const axios = require('axios')
const { Op } = require('sequelize')

module.exports = async function getPokemonByName(req, res, next) {
  try {
    let { name } = req.query
    name = name.toLowerCase()
    name.length < 3 ? res.status(404).json({ message: "No existe un pokemon con ese nombre" }) : null

    // busco en la db
    const dbPokemon = await Pokemon.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`
        },
      },
    })

    if (dbPokemon.length > 0) {

      res.json(dbPokemon)
    } else {
    
      
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      const pokemonDetails = response.data

      const types = pokemonDetails.types.map(type => type.type.name)

      const apiPokemonData = {
        id: pokemonDetails.id,
        name: pokemonDetails.name,
        type: types,
        img: pokemonDetails.sprites.other["official-artwork"].front_default,
        hp: pokemonDetails.stats.find(stat => stat.stat.name === 'hp').base_stat,
        attack: pokemonDetails.stats.find(stat => stat.stat.name === 'attack').base_stat,
        defense: pokemonDetails.stats.find(stat => stat.stat.name === 'defense').base_stat,
        speed: pokemonDetails.stats.find(stat => stat.stat.name === 'speed').base_stat,
        height: pokemonDetails.height,
        weight: pokemonDetails.weight,
      }


      res.json([apiPokemonData])
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.status(404).json({ message: "No existe un pokemon con ese nombre" })
    } else {
      next(error)
    }
  }
}
