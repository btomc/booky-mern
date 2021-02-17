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

//  Delete a product
//  DELETE /api/products/:id
//  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if(product) {
        await product.remove()
        res.json({ message: 'Product removed' })
    } else {
        res.status(404)
        throw new Error('Product ot found')
    }
})

//  Create a product
//  POST /api/products
//  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        title: 'Sample title',
        author: 'Sample author',
        price: 0,
        user: req.user._id,
        image: '/images/sample/png',
        genre: 'Sample genre',
        plot: 'Sample plot',
        countInStock: 0,
        numReviews: 0,
        publicationDate: '01/01/2020',
        binding: 'Paperback',
        pages: 0
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

//  Update a product
//  PUT /api/products/:id
//  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const {
        title,
        author,
        price,
        image,
        genre,
        plot,
        countInStock,
        numReviews,
        publicationDate,
        binding,
        pages
    } = req.body

    const product = await Product.findById(req.params.id)

    if(product) {
        product.title = title
        product.author = author
        product.price = price
        product.image = image
        product.genre = genre
        product.plot = plot
        product.countInStock = countInStock
        product.numReviews = numReviews
        product.publicationDate = publicationDate
        product.binding = binding
        product.pages = pages

        const updatedProduct = await product.save()
        res.json(updatedProduct)

    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

export { getProducts, getProductById, createProductReview, getTopProducts, deleteProduct, createProduct, updateProduct }