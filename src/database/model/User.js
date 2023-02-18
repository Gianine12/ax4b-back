module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("users", {
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
  
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
  
    setor: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return User;
}