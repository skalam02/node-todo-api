var expect = require('expect')
var request = require('supertest')

var {ObjectId} = require('mongodb')
var {app} = require('./../server')
var {Todo} = require('./../models/todo')

var todos = [{
  _id: new ObjectId(),
  text: "first"
}, {
  _id: new ObjectId(),
  text: "second"
}]

beforeEach((done) => {
  Todo.remove({}).then(()=>{
    return Todo.insertMany(todos)
  }).then(() => done())
})


//Testing Post Todos
describe('Post /todos', () => {
  it('Should create a new todo', (done) => {
    var text = 'Test todo text'
    
    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text)        
       })
      .end((err,res) => {
      if(err) {
        return done(err)
      }
      
      Todo.find({text}).then((todos) => {
        expect(todos.length).toBe(1)
        expect(todos[0].text).toBe(text)
        done()
      }).catch((e) => (done(e)))
    })
  })
  
  it('should not create todo with invalid body data', (done) => {
    request(app)
    .post('/todos')
    .send({})
    .expect(400)
    .end((err,res) => {
      if(err) {
        done(err)
      } else {
        Todo.find().then((todos)=>{
          expect(todos.length).toBe(2)
          done()
        }).catch((e) => {done(e)}) 
      }
    })
  })
})


//Testing GET /Todos
describe('GET /todos', () => {
  it('should get all the todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .end(done)
  })
})

describe('GET /todos/:id', ()=> {
  it('should return todo doc', (done)=> {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res)=> {
        expect(res.body.todo.text).toBe(todos[0].text);
    })
    .end(done);
  })
  
  it('should return 404 if todo not found', (done)=> {
    var hexId = new ObjectId().toHexString()
    
    request(app)
      .get(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });
  
  it('should return 404 for non-object ids', (done) => {
    request(app)
      .get('/todos/123abc')
      .expect(404)
      .end(done)
  })
  
});





