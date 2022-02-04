const express = require('express')

const app = express()

const notes = [
  { id: 1, title: 'Express'},
  { id: 2, title: 'Mongo' },
  { id: 3, title: 'Docker' }
]

app.use(express.json()) //middleware

//find
//reduce
//filter
//map
//push

app.get('/', (req, res) => {
  res.send('Hola mundo')
})

// CRUD

// POST
// GET (all)
// GET (un solo elemento)
// PUT (Actualizar un elemento)
// DELETE (eliminar)

app.get('/notes', (req, res) => {

  console.log(req.query)

  // if(req.query.token) {
  //   // vamos a verificar que los datos correcto
  //   res.status
  // }

  // listar
  res.json(notes)
})

app.get('/notes/:id', (req, res) => {
  const noteId = Number(req.params.id)
  // console.log(req.params, 'entro aqui en el find')
  // console.log(noteId)
  const note = notes.find((elem) => elem.id === noteId)

  if (!note) {
    return res.status(404).json({ error: `Note with ${noteId} not found`})
  }

  // ya no sigue aqui

  return res.status(200).json(note)
})

// app.get('/notes/:id/:name', (req, res) => {
//   const noteId = Number(req.params.id)
//   console.log(req.params)
//   console.log(noteId)
//   const note = notes.find((elem) => elem.id === noteId)

//   res.json(note)
// })

app.post('/api/notes', (req, res) => {
  const { title, content } = req.body;
  const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0;
  notes.push({ id: maxId + 1, title })


  if (!content) {
   return res.status(400).json({ message: 'Content key is require' }) 
  }
  return res.status(200).json({ message: 'Note created', notes})
})

app.delete('/api/notes/:id', (req, res) => {

  console.log('entro en el delete')
  const noteId = Number(req.params.id)
  const noteList = notes.filter((elem) => elem.id !== noteId)

  // ya no sigue aqui

  return res.status(200).json(noteList)
})


app.put('/api/notes/:id', (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;
  
  const note = notes.find((elem) =>  elem.id === Number(id))
  // verificar si nota no existe

  // javascript 

  if (!content) {
   return res.status(400).json({ message: 'Content key is require' }) 
  }
  return res.status(200).json({ message: 'Note created', notes})
})








// app.post('/notes', (req, res) => {
//   res.json(notes)
// })

// app.put('/notes', (req, res) => {
//   res.json(notes)
// })

// app.delete('/notes', (req, res) => {
//   res.json(notes)
// })

// CRUD









const PORT = 8080

app.listen(PORT, () => {
  console.log('Server is running with express')
})