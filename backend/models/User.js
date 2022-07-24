const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true 
    },
    date:{
        type: Date,
        default: Date.now
    },
  });

const User = mongoose.model('user', UserSchema);
//User.createIndexes(); // this is for unique email, same logic in auth code after this
module.exports = User;