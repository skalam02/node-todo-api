var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var {ObjectID} = require('mongodb')
var _ = require('lodash')


var {mongoose} = require('./db/mongoose')
var {Todo} = require('./models/todo')
var {User} = require('./models/user')

var port = process.env.PORT || 3000

app.use(bodyParser.json())


//Get Requests
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


//POST Requests
app.post('/users', (req,res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);
  console.log(user)
  
  user.save()
    .then((user)=>{return user.generateAuthToken()})
    .then((token)=>{res.send(token)})
    .catch((e)=> {res.status(400).send(e)})
});

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

//PATCH Route
app.patch('/todos/:id', isValid, (req,res) => {
  var id = req.params.id
  var body = _.pick(req.body, ['text','completed'])
  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }
  
  Todo.findByIdAndUpdate(id, {$set:body}, {new: true}).then((todo) => {
    if(!todo) {
      res.status(404).send();
    } else {
      res.send(todo)
    }
  }).catch((e)=> {
    res.status(400).send()
  })
})

//DELETE Route
app.delete('/todos/:id',isValid,(req,res) => {
  var id = req.params.id
  Todo.findByIdAndRemove(id).then((doc)=>{
    res.send(doc)
  }).catch((e)=>{
    console.log(e)
  })
})

app.listen(port, ()=> {
  console.log(`Started on port ${port}`)
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