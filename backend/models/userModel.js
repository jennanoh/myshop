import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true
  },
  isAdmin:{
    type: Boolean,
    required: true,
    default: false
  },
},{
  timestamps: true
})

//we can create our own methods in our models
userSchema.methods.matchPasswords = async function (enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password)
      //compare the entered password to the hashed user's password
}

const User = mongoose.model('users', userSchema)
export default User