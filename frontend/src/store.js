import {configureStore, combineReducers} from '@reduxjs/toolkit'
//register the reducers allowed to write data to the store

const store = configureStore({
  reducer: {},
  preloadedState:{}
})

export default store