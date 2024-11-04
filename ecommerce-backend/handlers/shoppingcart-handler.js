const { create } = require("../db/brand");
const Cart = require("../db/cart");
const Product = require("../db/product");

async function addToCart(userId, productId, quantity) {
    let cart = await Cart.findOne({ userId: userId, productId: productId });
    if (cart) {
        await Cart.findByIdAndUpdate(cart._id, {
            $set: { quantity: cart.quantity + quantity }
        })
    } else {
        cart = new Cart({
            userId: userId,
            productId: productId,
            quantity: quantity
        })
        await cart.save();
    }
    return Cart.find({ userId: userId, productId: productId });
}

async function removeFromCart(userId, productId) {
    await Cart.findOneAndDelete({ userId: userId, productId: productId });

}

async function getCart(userId) {
    const products = await Cart.find({ userId: userId }).populate("productId");
    return products.map((x) => ({
        product: x.productId,
        quantity: x.quantity
    }));
}

async function clearCart(userId) {
    await Cart.deleteMany({
        userId: userId
    })
}


module.exports = { addToCart, removeFromCart, getCart, clearCart }