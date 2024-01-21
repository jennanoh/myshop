import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Product from '../componets/Product'
import { Col, Row} from 'react-bootstrap'

//axios or fetch is often used to call the api
//useEffect is the first hook of the component - when it comes into effect - in this case we need to get the data when the component comes into effect
//useState is a hook where you can store data 
const HomeScreen = () => {

  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () =>{
      const {data} = await axios.get('/api/products')
      //we just want the data portion of the response (res)
      //this is deconstruction
      //async and await are a pair. the main thread waits for axios to fetch from a secondary thread
      setProducts(data)
    }

    fetchProducts()
  })

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map(p => (
            <Col sm={12} md={16} lg={4} xl={3}>
              <Product product={p}/>
            </Col>
          ))
          //map function lets you loop through data.
          //pass the products parameter to the Products component
        }
      </Row>
    </>
  )
}

export default HomeScreen