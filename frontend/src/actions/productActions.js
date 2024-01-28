import axios from "axios"
import { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../constants/productConstants"

//when this function is fired, it will be called async and a dispatch command will be passed to it
export const listProducts = () => async (dispatch) => {
  try{

    dispatch({
      type: PRODUCT_LIST_REQUEST
    })
    const {data} = await axios.get('/api/products/')

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data
    })

  } catch (error){
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message :
        error.message
        //is there an error message from API, if so does response data have a message
        //see message in productRoutes
        //show that message or display default message
    })
  }
}