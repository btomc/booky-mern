import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema (
    {
        name: { type: String, required: true },
        rating: { type: String, required: true },
        comment: { type: String, required: true },
    }, 
    {
        timestamps: true
    }
)

const productSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        image: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        genre: {
            type: String,
            required: true
        },
        reviews: [reviewSchema],
        rating: {
            type: Number,
            required: true,
            default: 0
        },
        numReviews: {
            type: Number,
            required: true,
            default: 0
        },
        plot: {
            type: String,
            required: true
        },
        publicationDate: {
            type: String,
            required: true
        },
        binding: {
            type: String,
            required: true
        },
        pages: {
            type: Number,
            required: true
        },
        countInStock: {
            type: Number,
            required: true,
            default: 0
        },
        price: {
            type: Number,
            required: true,
            default: 0
        },
    },
    {
        timestamps: true,
    }
)

const Product = mongoose.model('Product', productSchema)

export default Product
