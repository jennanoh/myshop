import { express } from 'express'
import products from './data/products'

const app = express()

//if someone calls route '/api/products' through the get funtion
//the request will result in a response which is json data of the products
//below is our first api
app.get('/api/products', (req, res) => {
  res.json(products)
})

app.get('/api/products/:id', (req,res) => {
  const product = products.find(p => p._id === req.params.id)
  res.json(product)
})

//this tells you that the backend is running
app.listen(5000, console.log('Server is running on port 5000'))