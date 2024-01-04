import React from 'react'
import{Card} from'react-bootstrap'

const Products = ({product}) => {
  return (
    <Card className='my-5 p-3 rounded'>
      <Card.Img src={product.image} variant='top' />
      <Card.Body>
        <Card.Title as='div'>
          <strong>{product.name}</strong>
        </Card.Title>
        <Card.Text as='div'>
          Rating is displayed here
        </Card.Text>
        <Card.Text as='div'>
          ${product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Products