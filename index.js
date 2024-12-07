const express = require('express');

const server = express();

// Query params = ?nome=NodeJS
// Route params = /curso/2
// Request Body = { nome: 'NodeJS', tipo: 'Backend'}

const cursos = ['Node JS', 'Java script', 'Reactive Native'];

// localhost:3000/curso
server.get('/curso/:index', (req, res) => {
  const index = req.params.index;

  return res.json(cursos[index]);
})

server.listen(3000);