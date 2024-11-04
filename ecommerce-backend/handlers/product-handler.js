const Product = require("../db/product");

async function addProduct(productData) {
    let product = new Product({
        ...productData
    });
    await product.save();
    return product.toObject();
}

async function updateProduct(id, productData) {
    let product = await Product.findByIdAndUpdate(id, productData);
    return product ? product.toObject() : null;
}

async function deleteProduct(id) {
    let product = await Product.findByIdAndDelete(id);
    return product ? product.toObject() : null;
}

async function getProducts() {
    let products = await Product.find();
    return products.map((category) => category.toObject());
}

async function getProductById(id) {
    let product = await Product.findById(id);
    return product ? product.toObject() : null;
}

async function getNewProducts() {
    let product = await Product.find({
        isNewProduct: true
    });
    return product.map((product) => product.toObject());
}

async function getFeaturedProducts() {
    let product = await Product.find({
        isFeaturedProduct: true
    });
    return product.map((product) => product.toObject());
}

async function getProductForListing(searchTerm, categoryId, brandId, pageNo = 1, pageSize = 10, sortBy = 'price', sortOrder = -1) {
    const queryFilter = {};

    if (searchTerm) {
        queryFilter.name = { $regex: searchTerm, $options: 'i' };
    }


    if (categoryId) {
        queryFilter.categoryId = categoryId;
    }

    if (brandId) {
        queryFilter.brandId = brandId;
    }


    pageNo = Math.max(1, pageNo);
    pageSize = Math.max(1, pageSize);

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder;

    const products = await Product.find(queryFilter)
        .sort(sortOptions)
        .skip((pageNo - 1) * pageSize)
        .limit(pageSize);

    return products.map((product) => product.toObject());
}



module.exports = { addProduct, deleteProduct, updateProduct, getProducts, getProductById, getNewProducts, getFeaturedProducts, getProductForListing }