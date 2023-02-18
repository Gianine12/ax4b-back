module.exports = (sequelize, DataTypes) => {
  const Votacao = sequelize.define("votacao", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
  
    
    data_votacao: {
      type: DataTypes.DATE,
      allowNull: false
    },
    
    hora_votacao: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });

  return Votacao;
}