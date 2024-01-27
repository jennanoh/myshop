import dotenv from 'dotenv'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import connectDB from './config/db.js'

dotenv.config()
connectDB()

//product depends on the user so import the user first
//use deleteMany to avoid repeat data
const importData = async () => {
  try{
    await Product.deleteMany()
    await User.deleteMany()

    const createdUsers = await User.insertMany(users)
    const adminUser = createdUsers[0]._id

    const sampleProducts = products.map(product => {
      return{...product, user: adminUser}
  })
    await Product.insertMany(sampleProducts)

    console.log('Data imported!')
    process.exit(1)

  } catch (error){
    console.error('Error: ${error.message}')
    process.exit(1)
  }
}

const destroyData = async () => {
  try{
    await Product.deleteMany()
    await User.deleteMany()

    console.log('Data destroyed!')
    process.exit(1)

  } catch (error){
    console.error('Error: ${error.message}')
    process.exit(1)
  }
}

if (process.argv[2] === '-d'){
  destroyData()
} else {
  importData()
}