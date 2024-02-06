import { CART_ADD_ITEM,CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants";

export const cartReducer = (state = {cartItems:[]}, action) => {
  switch (action.type){
    case CART_ADD_ITEM:
      const item = action.payload  //the new item
      const existItem = state.cartItems.find(x => x.product === item.product)  //find items that already exist in the cart
      if (existItem){
        item.qty = existItem + item.qty //add the qtys of the item together
        return {
          ...state,
          cartItems: state.cartItems.map(x=> x.product === existItem.product ? item: x) //take state of cart items and map through
          //if the item exists, add item with updated qty, if not, return old
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item]
          //in the case that the item does not already exist in cart, add the item to the end of the cartItems array
        }
      }
    case CART_REMOVE_ITEM:
      return{
        ...state,
        cartItems: state.cartItems.filter(x => x.product !== action.payload)
        //filter to anything that didnt exist in the payload aka the items you want to remove
      }

    case CART_SAVE_SHIPPING_ADDRESS:
      return{
        ...state,
        shippingAddress: action.payload
      }
    case CART_SAVE_PAYMENT_METHOD:
      return{
        ...state,
        paymentMethod: action.payload
      } //now the state has cartItems, shippingAddress and paymentMethod
    default:
      return state
  }
}

