import express from 'express'
import {addOrderItems, getOrderById, updateOrderToPaid } from '../controllers/orderController.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

//@desc   Create a new order
//route   POST /api/orders/
//access  private
router.route('/').post(protect, addOrderItems)
//post is used for creating new records, put is when you are updating an existing record

//@desc   get order by Id
//route   POST /api/orders/:id
//access  private
router.route('/:id').get(protect, getOrderById)

//@desc   Update order to paid
//route   POST /api/orders/:id/pay
//access  private
router.route('/:id/pay').put(protect, updateOrderToPaid)

export default router