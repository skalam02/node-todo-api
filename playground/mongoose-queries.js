var {mongoose} = require('./../server/db/mongoose');
var {Todo} = require('./../server/models/todo');
var {ObjectID} = require('mongodb')
var {User} = require('./../server/models/user')

var id = '5a7140c8cfdfe91f09c758ea';

if (!ObjectID.isValid(id)) {
  console.log('ID NOT VALID')
}

// Todo.find({
// //   _id: id
// }).then((todos) => {
//   console.log('Todos', todos)
// });

// Todo.findOne({_id: id}).then((todo)=> {
//   console.log('Todos', todo)
// })

// Todo.findById(id).then((todo)=> {
//   if(!todo) {
//     return console.log('ID not found')
//   }
//   console.log('Todos', todo)
// }).catch((e) => console.log(e));


User.findById(id).then((user)=> {
  if(!user) {
    return console.log('User not found')
  }
  console.log("User ", user)
}).catch((e) => {
  console.log(e)
})