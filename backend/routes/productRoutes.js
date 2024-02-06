import express from 'express'
import { getProductById, getProducts } from '../controllers/productController.js'


const router = express.Router()
//unlike server.js, we only need the router functionality from express 
// @desc  Fetch all products
//route   GET /api/products/
//access  public
router.get('/', getProducts)
//if someone calls route '/api/products/' from server.js
//through the get funtion 
//the request will call a controller function 

// @desc  Fetch all products by id
//route   GET /api/products/:id
//access  public
router.get('/:id', getProductById)
//if someone calls route '/api/products/:id'

export default router