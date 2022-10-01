const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    ID:{
      type: DataTypes.VIRTUAL,
      get(){
        return `RP${this.getDataValue('id')}`
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {  
      type: DataTypes.TEXT,
      allowNull: false,
    },
    healthScore: {
      type: DataTypes.STRING,
      validate: {
        min: 0,
        max: 100
      }
    },
    steps:{
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    image:{
      type: DataTypes.STRING,
      defaultValue: "https://img.freepik.com/psd-gratis/vista-superior-libro-recetas-ingredientes_23-2148561473.jpg?w=2000",
    }
  },{
    timestamps: false,
  });
};
