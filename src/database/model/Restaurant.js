module.exports = (sequelize, DataTypes) => {
  const Restaurant = sequelize.define("restaurant", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
  
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  
    stars: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: { 
        min: 0,
        max: 5
      }
    }
  });

  return Restaurant;
}