module.exports = {
  dialect: "mysql",
  host: "localhost",
  database: "teste_tecnico",
  username: "root",
  password: "1234",

  define: {
    timestamp: true,
    underscored: true
  },

  dialectOptions: {
    useUTC: false
   },

}