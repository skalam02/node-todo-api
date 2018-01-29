var MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
  if(err) {
    return console.log("Unable to connect to the MongoDB server")
  }
  console.log("connected to mongoDB server")
  
//   db.collection('Todos').insertOne({
//     text: 'Something to do',
//     completed: false
//   }, (err, result) => {
//     if(err) {
//       return console.log('unable to insert todo', err)
//     }
//     console.log(JSON.stringify(result.ops, undefined,2))
//   })
  
  db.collection('Todos').find({completed: false}).toArray().then((result) => {
    console.log(result)
  }, (err) => {
    console.log(err)
  }
  )
  
// db.collection('Users').insertOne({
//     name: 'Jane Doe',
//     age: 25,
//     location: 'Cincinnati'
//   }, (err, result) => {
//     if(err) {
//       return console.log('unable to insert user', err)
//     }
//     console.log(JSON.stringify(result.ops, undefined,2))
//   })
  
  
  
  db.close()
})