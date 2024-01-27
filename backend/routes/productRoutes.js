import express from 'express'
import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

const router = express.Router()
//unlike server.js, we only need the router functionality from express 

router.get('/', asyncHandler(async(req, res) => {
  const products = await Product.find({})
  res.json(products)
}))
//if someone calls route '/api/products/' from server.js
//through the get funtion 
//the request will result in a response which is json data of the products

router.get('/:id', asyncHandler(async(req,res) => {
  const product = await Product.findById(req.params.id)
  if(product){
    res.json(product)
  } else {
    res.status(404).json({message:'Product not found'})
  }
  
}))
//if someone calls route '/api/products/:id'

export default router