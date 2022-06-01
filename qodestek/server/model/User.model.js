const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email:{
    type:String,
    require:true,
    unique:true
  },
  password:{
    type:String,
    require:true
  },
  createAt:{
    type:String,
    default:Date.now
  }
})
module.exports = mongoose.model('user',UserSchema);
