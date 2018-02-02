var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var {ObjectID} = require('mongodb')

var {mongoose} = require('./db/mongoose')
var {Todo} = require('./models/todo')
var {User} = require('./models/user')

app.use(bodyParser.json())

app.get('/todos', (req,res) => {
  Todo.find().then((s)=>{
    res.send(s)
  },(e)=>{
    res.status(400).send(e)
  })
})

app.get('/todos/:id', isValid , (req,res) => {
  var id = req.params.id 
  Todo.findById(id).then((todo) =>{
    if(!todo) {
      res.status(404).send('Cannot Find Todo')
    } else {
      res.send(todo)
    }
  }).catch((e)=>{res.send.statusCode(400)})
})


app.post('/todos', (req,res) => {
  var todo = new Todo({
    text: req.body.text
  })
  
  todo.save().then((doc)=>{
    res.send(doc)
  },(e)=> {
    res.status(400).send(e)
  })
})

app.listen(3000, ()=> {
  console.log('Started on port 3000')
})

module. exports = {
  app
}

function isValid (req,res,next) {
  var id = req.params.id
  if (!ObjectID.isValid(id)) {
    res.status(404).send()
  } else {
    next()
  }
}