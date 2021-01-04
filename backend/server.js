import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

import connectDB from './config/db.js'
// import products from './data/products.js'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config()

// connecting database
connectDB()

// defining 
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('API is running')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)


// NOT FOUND ERROR
app.use(notFound)

// CUSTOM ERROR
app.use(errorHandler)


const PORT = process.env.PORT || 5000

app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode port ${PORT}`.yellow.bold
    )
)