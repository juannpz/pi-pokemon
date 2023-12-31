const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    api_id: {
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    img: {
      type: DataTypes.STRING,
    },
    hp: {
      type: DataTypes.STRING,
    },
    attack: {
      type: DataTypes.STRING,
    },
    defense: {
      type: DataTypes.STRING,
    },
    speed: {
      type: DataTypes.STRING,
    },
    height: {
      type: DataTypes.STRING,
    },
    weight: {
      type: DataTypes.STRING,
    },
    origin: {
      type: DataTypes.STRING,
      defaultValue: "api",
    }
  }, {
    createdAt: false,
    updatedAt: false,
  })
}
