var mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://admin:AdminPassword@ds121588.mlab.com:21588/heroku-app-1');

module.exports = {
  mongoose
}
