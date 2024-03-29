import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

//all Db commands are async
const getProducts = asyncHandler(async(req, res) => {
  const products = await Product.find({})
  res.json(products)
})

const getProductById = asyncHandler(async(req,res) => {
  const product = await Product.findById(req.params.id)
  if(product){
    res.json(product)
    //the API request will route to result in a response which is json data of the products
  } else {
    res.status(404).json({message:'Product not found'})
  }
})

export {getProductById, getProducts}