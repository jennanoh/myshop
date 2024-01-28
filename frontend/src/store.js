import {configureStore, combineReducers} from '@reduxjs/toolkit'
import { productListReducer } from './reducers/productReducers'
//register the reducers allowed to write data to the store
//use combineReducers in the case of multiple reducers

const rootReducer = combineReducers({
  productList: productListReducer
})
const store = configureStore({
  reducer: rootReducer,
  preloadedState:{}
})

export default store