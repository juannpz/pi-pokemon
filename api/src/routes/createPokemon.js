const { Pokemon, Type } = require('../db.js')

const createPokemon = async (req, res, next) => {
    try {
      const { name, img, hp, attack, defense, speed, height, weight, types } = req.body

      const existingPokemon = await Pokemon.findOne({ where: { name } })
      if (existingPokemon) {
        return res.status(409).json({ error: 'Ya existe un Pokémon con ese nombre.' })
      }

      const existingTypes = await Type.findAll({ where: { name: types } })
      const existingTypeNames = existingTypes.map((type) => type.name)
      const invalidTypes = types.filter((type) => !existingTypeNames.includes(type))
      if (invalidTypes.length > 0) {
        return res.status(400).json({ error: 'no se encuentra el tipo de pokemon en la base de datos' })
      }

      const createdTypes = await Type.findAll({ where: { name: existingTypeNames } })

      const associatedTypes = existingTypeNames;
      const createdPokemon = await Pokemon.create({
        name,
        img,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        origin: "local",
        type: associatedTypes,
      });
      await createdPokemon.setTypes(createdTypes)


      const response = {
        id: createdPokemon.id,
        name: createdPokemon.name,
        img: createdPokemon.img,
        hp: createdPokemon.hp,
        attack: createdPokemon.attack,
        defense: createdPokemon.defense,
        speed: createdPokemon.speed,
        height: createdPokemon.height,
        weight: createdPokemon.weight,
        types: associatedTypes,
      };
  
      res.json(response)
    } catch (error) {
      next(error)
    }
  };

  module.exports = createPokemon
