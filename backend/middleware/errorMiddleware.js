//when exceptions happen, companies usually want to log it through the next function
//middleware catches errors like a try catch block for your whole backend
//in our case we will just handle the error with a function without logging it

//res.statusCode === 200 ? 500 : res.statusCode
//if the error number is 200, it is wrong. change to 500. if it is not 200, leave as is

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode).json({message: err.message})
}

export default errorHandler