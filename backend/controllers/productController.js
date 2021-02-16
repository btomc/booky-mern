import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'


//  Fetch all products
//  GET /api/products
//  Public
const getProducts = asyncHandler(async (req, res) => {
    const keywordTitle = req.query.keyword ? {
        title: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    const keywordAuthor = req.query.keyword ? {
        author: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    const keywordGenre = req.query.keyword ? {
        genre: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}
    
    
    const products =  await Product.find({
        $or : [
        {...keywordTitle},
        {...keywordAuthor},
        {...keywordGenre}
        ] 
    })
    
    res.json(products)
})


//  Fetch single product
//  GET /api/products/:id
//  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

//  Create new review
//  POST /api/products/:id/reviews
//  Private
const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body

    const product = await Product.findById(req.params.id)

    if(product) {
        const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())

        if(alreadyReviewed) {
            res.status(400)
            throw new Error('Product already reviewed')
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }

        product.reviews.push(review)

        product.numReviews = product.reviews.length

        product.rating = 
            product.reviews.reduce((acc, item) => item.rating + acc, 0) /
            product.reviews.length

        await product.save()
        res.status(201).json({ message: 'Review added' })
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

//  Get top rated products
//  GET /api/products/top
//  Public
const getTopProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(4)

    res.json(products)
})

export { getProducts, getProductById, createProductReview, getTopProducts }