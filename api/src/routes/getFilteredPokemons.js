const { Pokemon } = require('../db.js')
const {Op} = require('sequelize')

module.exports = async function getFilteredPokemon(req, res, next) {
    try {
        let {start, end, filteredBy, value} = req.query
        start = parseInt(start)
        end = parseInt(end)
        value = String(value)
        let dbPokemons = []

        switch (filteredBy) {
            case "origin":
                dbPokemons = await Pokemon.findAll({
                    offset: start,
                    limit: end - start + 1,
                    where: {
                        origin: value
                    }
                })
                break

            case "type":
                dbPokemons = (await Pokemon.findAll({
                    offset: start,
                    limit: end - start + 1,
                    where: {
                      type: {
                        [Op.contains]: [value],
                      },
                    },
                }))
                break
        
            default:
                break
        }


        if (dbPokemons) {
            res.json(dbPokemons)
        }
    } catch (error) {
        next(error)
    }
}