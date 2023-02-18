const express = require('express');
const cors = require('cors')
const router = require('./router');

const PORT = 8080;
const app = express();

db = require('./database');

db.sequelize.sync();

app.use(cors())
app.use(express.json());
app.use('/api/', router);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT} no http://localhost:${PORT}`);
})
