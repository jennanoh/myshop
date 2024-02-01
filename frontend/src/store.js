import {configureStore, combineReducers} from '@reduxjs/toolkit'
import { productDetailsReducer, productListReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
//register the reducers allowed to write data to the store
//use combineReducers in the case of multiple reducers

const rootReducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer
})
//we need to update the preloaded State of the cart by retrieving data back from local browser storage
const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
//put this preloaded state to a separate variable as good practice
//in case there might be diff preloaded states for diff reducers
const initialState = {
  cart: {cartItems: cartItemsFromStorage}
}
const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState
})

export default store