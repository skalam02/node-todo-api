var MongoClient = require('mongodb').MongoClient

//Connect to Mongo Server
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
    if(err) {
      return console.log("Unable to connect to the MongoDB server")
    }
    console.log("connected to mongoDB server")
    
    //deleteMany
//     db.collection('Todos').deleteMany({completed: false}).then((result) => {
//       console.log(result)
//     }, (err) => {
//       console.log(err)
//     })
  
  //delete one returns the number back
//   db.collection('Todos').deleteOne({text: "first"}).then((result) => {
//   console.log(result)
//   })
  
  
  //findOneAndDelete returns the document back
//     db.collection('Todos').findOneAndDelete({text:"first"}).then((result) => {
//     console.log('Deleted', result)
//   }, (err) => {
//     console.log(err)
//   })
})



//deleteOne

//db.close()