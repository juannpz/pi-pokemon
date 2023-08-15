const { Pokemon, Type } = require('../db.js')
const axios = require('axios')

module.exports = async function getTypes(req, res, next) {
    try {
      
      //traigo los types y almaceno en una const la prop results del objeto (data) de la respuesta.
      const response = await axios.get('https://pokeapi.co/api/v2/type')
      const typesFromAPI = response.data.results
  
      // guardo en savedTypes el conjunto de promises que ejecuta Promise.all
      // guardo en typeDetails el objeto que tiene cada prop "url"
      // me quedo solo con el nombre de cada type
      // con findOrCreate busco los types en la db y si no están los guardo
      const savedTypes = await Promise.all(typesFromAPI.map(async (type) => {
        const typeDetails = await axios.get(type.url)
        const typeName = typeDetails.data.name
        return Type.findOrCreate({
          where: { name: typeName },
          defaults: { name: typeName },
        })
      }))
  
      // respondo solo con los nombres de los tipyes guardados en la db
      const typeNames = savedTypes.map((type) => type[0].name)
  
      res.json(typeNames)
    } catch (error) {
      next(error)
    }
  }