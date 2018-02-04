var mongoose = require('mongoose')
var validator = require('validator')
var jwt = require('jsonwebtoken')

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: `{value} is not a valid email`
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [
    {
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
})

var User = mongoose.model('User', UserSchema)

UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth'
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString()
  
  user.tokens.push({access, token})
  
  return user.save().then((token)=> {
    return token;
  })
};

module.exports = {
  User
}