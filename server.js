const express = require('express');
const path = require('path');
const app = express();

// Serve os arquivos estáticos da pasta build
app.use(express.static(path.join(__dirname, 'build')));

// Redireciona todas as requisições para o index.html
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});