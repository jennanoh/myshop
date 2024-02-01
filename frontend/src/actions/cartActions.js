import axios from 'axios'
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'
//getState allows actions to grab data from the store
//equivalent to useSelect in components

export const addToCart = (id, qty) =>  async (dispatch, getState) => {
  const {data} = await axios.get(`/api/products/${id}`)
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty
        //this essencially means qty: qty
      }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    //convert all cart items from store to JSON string and then place in local browser storage
  }

export const removeFromCart = (id) => (dispatch, getState) => {

    dispatch({
      type: CART_REMOVE_ITEM,
      payload: id
    })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
  }
