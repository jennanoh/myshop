import {useDispatch, useSelector} from 'react-redux'
import {useState} from 'react'
import { Form, Col, Button} from 'react-bootstrap'
import {useNavigate} from'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'
import { FormContainer } from '../components/FormContainer'
import { savePaymentMethod } from '../actions/cartActions'

const PaymentScreen = () => {
  const navigate = useNavigate()
  const cart = useSelector((state)=> state.cart)
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
    <FormContainer>
      <CheckoutSteps step1 step2 step3/>
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
        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}
export default PaymentScreen