const { DataTypes, UUIDV4, UUIDV1 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('type', {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV1,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    createdAt: false,
    updatedAt: false
  });
};
