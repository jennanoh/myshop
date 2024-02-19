import {useEffect, useState} from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { Button, Row, Col, Form  } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { login } from '../actions/userActions'
import { FormContainer } from '../components/FormContainer'

const LoginScreen = () => {
  
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const redirect = location.search? location.search.split('=')[1]: '/'
  const userLogin = useSelector((state) => state.userLogin)
  const {loading, error, userInfo} = userLogin

  useEffect(() => {
    if (userInfo) {
      navigate(redirect) //if userInfo already exists take them to shipping
    }
  },[navigate, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()//by default a submit button on a form will submit the info to the same page - so prevent that
    dispatch(login(email, password))//we want to submit it to the action
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email Adress</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type='Submit' variant='primary'>
          Sign In
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
        New Customer?{''}
          <Link to={redirect ? `/register?redirect=${redirect}`: '/register'}> {/* include redirect after registration */}
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen