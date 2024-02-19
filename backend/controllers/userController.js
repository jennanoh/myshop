import asyncHandler from "express-async-handler";
import User from '../models/userModel.js'
import generateToken from "../utils/generateToken.js";

//use req.body to assign JSON content
//similar to req.params where we single out a parameter
const authUser = asyncHandler(async(req, res) => {
  const {email, password} = req.body
  //essentially means req.body.email and req.body.password
  const user = await User.findOne({email})
  //({email}) means ({email: email}) - find the email in userModel that matches the user's email
  if (user && await user.matchPasswords(password)) {
    return res.json ({
      _id: user.id,
      name:user.name,
      email: user.email,
      isAdmin:user.isAdmin,
      token: generateToken(user.id)
    })
  } else {
    res.status(401)
    //401 is unauthorized
    throw new Error('Invalid email or password')
  }
})

export {authUser}