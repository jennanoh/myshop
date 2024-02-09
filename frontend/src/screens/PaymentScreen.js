import {useDispatch, useSelect} from 'react-redux'
import {useState} from 'react'
import { Form, Button, Col} from 'react-bootstrap'
import {useNavigate} from'react-router-dom'
import CheckoutSteps from '../componets/CheckoutSteps'
import FormContainer from '../components/FormContainer'
import { savePaymentMethod } from '../actions/cartActions'

const PaymentScreen = () => {
  const navigate = useNavigate()
  const cart = useSelect((state)=> state.cart)
  const {shippingAddress} = cart

  if(!shippingAddress){
    navigate('/shipping')
  }

  const [paymentMethod, setPaymentMethod]  = useState('PayPal') //default is Paypal
  
  const dispatch = useDispatch()
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeorder')
  }

  return(
    <Form.Container>
      <CheckoutSteps step1 step2 step3>
        <h1>PaymentMethod</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label as='legend'>Select Method</Form.Label>
            <Col>
              <Form.Check
              type='radio'
              label='PayPal or Credit Card'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked
              onChange = {(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </Col>
          </Form.Group>
        </Form>
      </CheckoutSteps>
    </Form.Container>
  )

}