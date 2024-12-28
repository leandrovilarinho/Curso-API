const express = require('express')

const server = express()

server.use(express.json())

// Query params = ?nome=NodeJS
// Route params = /curso/2
// Request Body = { nome: 'NodeJS', tipo: 'Backend'}

// CRUD Create, Read, Update, Delete

const cursos = ['Node JS', 'Java script', 'Reactive Native']

// Middleware global
server.use((req, res, next) => {
  console.log(`URL CHAMADA: ${req.url}`)

  return next()
})

function checkCurso(req, res, next){
  if(!req.body.name){
    return res.status(400).json({ error: "Nome do curso é obrigatório"})
  }

  return next();
}

function checkIndexCurso(req, res, next){
  const curso = cursos[req.params.index]

  if(!curso){
    return res.status(400).json({ error: "O curso requisitado não existe"})
  }

  req.curso = curso

  return next()
}

server.get('/cursos', (req, res) => {
  return res.json(cursos)
})

// localhost:3000/curso
server.get('/cursos/:index', checkIndexCurso, (req, res) => {
  const index = req.params.index

  return res.json(req.curso)
})

// Criando um novo curso
server.post('/cursos', checkCurso, (req, res) => {
  const { name } = req.body
  cursos.push(name)

  return res.json(cursos)
})

// Atualizando um curso
server.put('/cursos/:index', checkCurso, checkIndexCurso, (req,res) => {
  const { index } = req.params
  const { name } = req.body

  cursos[index] = name

  return res.json(cursos)
})

// Excluindo alguns cursos

server.delete('/cursos/:index', checkIndexCurso, (req,res) => {
  const { index } = req.params
  cursos.splice(index)

  return res.json(cursos)
})

server.listen(3000);