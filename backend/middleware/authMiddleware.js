import jwt from "jsonwebtoken";
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asyncHandler(async(req, res, next) => {
  let token  //create variable called token

  //if the req header includes authorization and that req starts with the word Bearer...
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try{
      token = req.headers.authorization.split(' ')[1] //split the word Bearer from the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
      req.user = await User.findById(decoded.id).select('-password') //search in dataModel and return user info in req.user except password
      next()
    } catch(error){
      res.status(401)
      throw new Error('Not authorized, invalid token')
    }
  }
  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

export default protect