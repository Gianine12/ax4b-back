const { Sequelize } = require('sequelize');

const configDB = require('../config/database');

const User = require('./model/User');
const Restaurant = require('./model/Restaurant');
const Votacao = require('./model/Votacao');

const connection = new Sequelize(configDB);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = connection;

db.user = User(connection,Sequelize);
db.restaurant = Restaurant(connection,Sequelize);
db.votacao = Votacao(connection,Sequelize);

db.votacao.belongsTo(db.user, {
  foreignKey: 'usuario_id',
  as: 'usuario'
});

db.votacao.belongsTo(db.restaurant, {
  foreignKey: 'restaurante_id',
  as: 'restaurante'
});

module.exports = db;