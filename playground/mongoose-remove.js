var {mongoose} = require('./../server/db/mongoose');
var {Todo} = require('./../server/models/todo');
var {ObjectID} = require('mongodb')
var {User} = require('./../server/models/user')


//Remove entire Database
Todo.remove({}).then((result) => {
  console.log(result);
})