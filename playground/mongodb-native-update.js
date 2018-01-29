//Create Mongo Client
var MongoClient = require('mongodb').MongoClient
var ObjectId = require('mongodb').ObjectID

//Connect to database(local)
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
    if(err) {
      return console.log("Unable to connect to the MongoDB server")
    }
    console.log("connected to mongoDB server")
  
//     db.collection('Todos').findOneAndUpdate(
//       { _id: new ObjectId('5a6fa1dd37a8c904e15471b6') },
//       { $set: {completed:true} },
//       { returnOriginal: false }
//     ).then(
//         (result)=>{console.log(result)},
//         (error)=>{console.log(error)}
//        )
    db.collection('Users').findOneAndUpdate(
      { _id: new ObjectId('5a6e848274739703e03101d1') },
      { $set: {name: "Stylianos Kalamaras"},
        $inc: {age:4} },
      { returnOriginal: false }
    ).then(
        (result)=>{console.log(result)},
        (error)=>{console.log(error)}
       )
  
   
//     db.close()
})