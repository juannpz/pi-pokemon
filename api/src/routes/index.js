const { Router } = require('express');
const getAllPokemons = require('./getAllPokemons')
const getPokemonById = require('./getPokemonById')
const getAllTypes = require('./getTypes')
const getPokemonByName = require('./getPokemonByName');
const createPokemon = require('./createPokemon')

const router = Router();

router.get('/pokemons/name', getPokemonByName)
router.get('/pokemons/:idPokemon', getPokemonById)
router.post('/pokemons', createPokemon)
router.get('/pokemons', getAllPokemons)
router.get('/types', getAllTypes)


module.exports = router;