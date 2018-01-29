//Create Mongo Client
var MongoClient = require('mongodb').MongoClient

//Connect to database(local)
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
    if(err) {
      return console.log("Unable to connect to the MongoDB server")
    }
    console.log("connected to mongoDB server")
  
    db.collection('Todos').insertOne({text:"Win the lottery", completed:false}).then((result)=>{console.log(result.ops)},(error)=>{console.log(result)})
   
    db.close()
})