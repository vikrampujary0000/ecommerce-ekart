const mongoose = require("mongoose");
const wishlistSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'products' }
});
const Wishlist = mongoose.model('wishlists', wishlistSchema);
module.exports = Wishlist;