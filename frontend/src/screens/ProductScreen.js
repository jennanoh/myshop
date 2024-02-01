import React, {useEffect, useState} from 'react'
import { Row,Col,Image,Card,Button, ListGroup, ListGroupItem, Form } from 'react-bootstrap'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../componets/Loader'
import Message from '../componets/Message'
import Rating from '../componets/Rating'
import { listProductDetails } from '../actions/productActions'
//using hooks in our components to read parameters through the useParams hook
//we can find the product by the id in the url this way
//use before rendering/displaying (aka return)

const ProductScreen = () => {

  const[qty, setQty] = useState(1)
  //use the local state for qty since we only need it here
  //(1) is the default qty value
  const params = useParams();
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(listProductDetails(params.id))
  },[dispatch, params])
  //dependencies in [], you need dispatch and params before the useEffect can come into play

  //the useEffect is only called once when the component comes into effect but the product Details can keep updating
  const productDetails = useSelector((state) => state.productDetails)
  const {loading, product, error} = productDetails
  
  const addToCartHandler = () => {
    navigate(`/cart/${params.id}?qty=${qty}`)
  }
  return (
    <>
    <Link className='btn btn-light my-3' to='/'>
      Go Back
    </Link>
    {
      loading ? <Loader />
      : error ? (<Message variant='danger'>{error}</Message>)
      : (

        <Row>
          <Col md={6}>
            <Image src={product.image} alt{...product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
              </ListGroup.Item>
              <ListGroup.Item>
                Price: ${product.price}
              </ListGroup.Item>
              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                    <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      ${product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroupItem>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                      <Form.Select
                        value={qty}
                        onChange={e => setQty(e.target.value)}
                      >
                        {
                          [...Array(product.countInStock).keys()].map (x => (
                          <option key={x+1} value={x+1}>
                            {x+1}
                          </option>))
                          //spread the countInStock to an array of nums
                          //for each index(key) of the array make an option in the drop down
                          //next option is greater than the last by 1
                        }
                      </Form.Select>
                      </Col>
                    </Row>
                  </ListGroupItem>
                )

                }
                <ListGroup.Item>
                  <Button
                    className='btn-block'
                    type='button'
                    onClick= {addToCartHandler}
                    disabled= {product.countInStock === 0}
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
        </>
  )
}

export default ProductScreen