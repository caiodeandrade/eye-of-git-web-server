// src/index.js
const express = require('express');
const app = express();
const { PORT } = require('./src/config');
const githubRoutes = require('./src/routes/github.routes');

// Middleware para interpretar JSON
app.use(express.json());

// Registra as rotas
app.use('/', githubRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});