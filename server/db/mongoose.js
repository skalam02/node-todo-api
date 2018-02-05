var mongoose = require('mongoose')
mongoose.Promise = global.Promise

var env = process.env.NODE_ENV || 'development'
if (env ==='production') {
  mongoose.connect('mongodb://admin:AdminPassword@ds121588.mlab.com:21588/heroku-app-1');
} else {
  mongoose.connect('mongodb://localhost/TodoApp')
}

module.exports = {
  mongoose
}
