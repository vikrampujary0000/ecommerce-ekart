const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    shortDescription: {
        type: String,
        required: [true, 'Short description is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be a positive number']
    },
    discount: {
        type: Number,
        required: [true, 'Discount is required'],
        min: [0, 'Discount must be a positive number']
    },
    images: {
        type: [String]
    },
    isFeaturedProduct: {
        type: Boolean
    },
    isNewProduct: {
        type: Boolean
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories',
        required: [true, 'Category ID is required']
    },
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'brands',
        required: [true, 'Brand ID is required']
    }
});
const Product = mongoose.model('products', productSchema);
module.exports = Product;