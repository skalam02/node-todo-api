var expect = require('expect')
var request = require('supertest')

var {app} = require('./../server')
var {Todo} = require('./../models/todo')

var todos = [{
  text:"first"
}, {
  text: "second"
}]

beforeEach((done) => {
  Todo.remove({}).then(()=>{
    return Todo.insertMany(todos)
  }).then(() => done())
})

describe('Post /todos', () => {
  it('Shoulc create a new todo', (done) => {
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

describe('GET /todos', () => {
  it('should get all the todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .end(done)
  })
})