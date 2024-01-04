import React from 'react'
import products from '../products'
import Products from '../componets/Products'

const HomeScreen = () => {
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map(p => (
            <Col sm={12} md={16} lg={4} xl={3}>
              <Products products={p}/>
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