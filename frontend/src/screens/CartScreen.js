import React, { useEffect } from 'react'
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom'
import { addToCart, removeFromCart } from '../actions/cartActions'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../componets/Message'
import { Button, ListGroup, Row, Col, Image, Card, Form  } from 'react-bootstrap'

const CartScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const params = useParams()
  const productId = params.id 
  const location = useLocation()
  const qty = location.search ? Number(location.search.split('=')[1]) : 1
  //when routed to from the product screen through the addToCartHandler: navigate(`/cart/${params.id}?qty=${qty}`)
  //use useLocation for OPTIONAL params 
  useEffect(() => {
    if (productId){
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, params, qty, productId])

  const cart = useSelector((state) => state.cart)
  //state.cart -> cart is the name we gave our reducer in store.js
  const {cartItems} = cart

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping')
    //redirect to shipping is optional
    //read using the useLocation hook in LoginScreen
  }
  return (
    <Row className='mt-5'>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
            <Message>
              Your cart is empty <Link to='/'>Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant='flush'>
              {cartItems.map((item)=> (
                <ListGroup.Item key ={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>{item.price}</Col>
                    <Col md={2}>
                      <Form.Select
                        value = {item.qty}
                        onChange = {(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      > {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x+1} value={x+1}>
                          {x+1}
                        </option>
                      ))}
                      </Form.Select>
                    </Col>
                    <Col md={2}>
                      <Button
                        variant='light'
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )
        }
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2> {/*accumulate all the cart items, reduce to one number. default is 0*/}
                Subtotal ({cartItems.reduce(
                  (acc, item) => acc + item.qty, 0
                  )})
                items
              </h2>
              $ {/*show dollar value. to 2 decimal places*/}
              {cartItems.reduce(
                (acc, item) => acc +item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button 
                className ='btn-block'
                disabled = {cartItems.length === 0}
                onClick = {checkoutHandler}
              >
                Proceed to Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen