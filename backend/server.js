import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import errorHandler from './middleware/errorMiddleware.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import path from 'path'

const app = express()
dotenv.config()
connectDB()

app.use(express.json()) //data from FE will be converted to json
app.use('/api/products', productRoutes)
//if you call '...', go to productRoutes aka router
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname = path.resolve() //directory
if (process.env.NODE_ENV === 'production'){ //if in production mode
  app.use(express.static(path.join(__dirname, '/frontend/build')))
  app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname,'frontend', 'build', 'index.html'))
  }) //production mode will only run backend - cannot do conccurently
  //use express to the static folder in frontend
}// '*' means whatever url is returned
//find the index.html in the frontend build folder

app.use(errorHandler)
// app.listen(5000, console.log('Server is running on port 5000'))
//this tells you that the backend is running
//change for the purpose of deployment - port 5000 is only guarenteed locally
const port = process.env.PORT
app.listen(port, console.log(`Server is running on port ${port}`))
