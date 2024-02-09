import asyncHandler from "express-async-handler";
import Order from "../models/orderModel";

const addOrderItems = asyncHandler(async(res,req) => {
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
    res.statusCode(201).json(createdOrder) //this is what you're sending back
  }
})