import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

const addOrderItems = asyncHandler(async(req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice, 
    totalPrice
  } = req.body

  if(orderItems && orderItems.length === 0) {
    res.statusCode(400)
    throw new Error('No order Items')
  } else {
    const order = new Order ({
      orderItems,
      user: req.user.id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice, 
      totalPrice
    })
    const createdOrder = await order.save() //save the new row of info
    res.status(201).json(createdOrder) //this is what you're sending back
  }
})

const getOrderById = asyncHandler(async(req,res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  ) //when you call for the order data, also populate (aka grab) the name and email data from users
  //this is possible because the product data includes users
  if (order){
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

const updateOrderToPaid = asyncHandler(async(req,res) => {
  const order = await Order.findById(req.params.id)
  if(order){
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address
    }
    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } else{
    res.status(404)
    throw new Error('Order not found')
  }
})

export {addOrderItems, getOrderById, updateOrderToPaid}