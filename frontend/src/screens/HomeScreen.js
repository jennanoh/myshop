import React, {useEffect} from 'react'
import { Col, Row} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../componets/Product'
import { listProducts } from '../actions/productActions'
import Loader from '../componets/Loader'
import Message from '../componets/Message'


const HomeScreen = () => {

  const dispatch = useDispatch()
  //we will be using the dispatch hook
    useEffect(() => {
      dispatch(listProducts())
      //trigger the action function
    },[dispatch])

  const productList = useSelector((state) => state.productList)
  const {loading, products, error} = productList
  //we want to select the productList data from the state
  //this is the name of our reducer - see store.js
  //we want all three types of data productList.loading, productList.products and productList.error

return (
  <>
    <h1>Latest Products</h1>
      {
          loading? <Loader/> :
            error? (<Message variant='danger'>{error}</Message>) :
          (<Row>
            {products.map(p => (
              <Col key={p._id} sm={12} md={16} lg={4} xl={3}>
                <Product product={p}/>
              </Col>
            ))
            //map function lets you loop through data.
            //pass the products parameter to the Products component
            }
          </Row>)
      }

  </>
)
}


export default HomeScreen