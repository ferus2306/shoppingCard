
import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'


// @Desc FETCH ALL PRODUCTS
// @Route GET /api/products
// @accss  Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})

    res.json(products)
})



// @Desc FETCH SINGLE PRODUCT
// @Route GET /api/products/id
// @accss  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
            res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})


export {
    getProducts, getProductById
}