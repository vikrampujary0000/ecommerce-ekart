const express = require("express");
const router = express.Router();
const { getNewProducts, getFeaturedProducts, getProductForListing, getProductById } = require("../handlers/product-handler");
const { getCategory } = require("../handlers/category-handler");
const { getBrands } = require("../handlers/brand-handler");
const { getWishlist, addToWishlist, removeFromWishlist } = require("../handlers/wishlist-handler");
const { getCart, addToCart, removeFromCart, clearCart } = require("../handlers/shoppingcart-handler");
const { addOrder, getCustomerOrders } = require("../handlers/order-handler");

router.get("/new-products", async (req, res) => {
    try {
        let result = await getNewProducts();
        return res.status(200).json({
            message: "New products fetched successfully",
            newProducts: result
        });
    } catch (err) {
        console.error("Error fetching new products:", err);
        return res.status(500).json({ message: "Internal server error" });
    }

})

router.get("/featured-products", async (req, res) => {
    try {
        let result = await getFeaturedProducts();
        return res.status(200).json({
            message: "Feature products fetched successfully",
            featuredProducts: result
        });
    } catch (err) {
        console.error("Error fetching featured products:", err);
        return res.status(500).json({ message: "Internal server error" });
    }

})

router.get("/categories", async (req, res) => {
    try {
        let result = await getCategory();
        return res.status(200).json({
            message: "Categories fetched successfully",
            category: result
        });
    } catch (err) {
        console.error("Error fetching category:", err);
        return res.status(500).json({ message: "Internal server error" });
    }

});

router.get("/brands", async (req, res) => {
    try {
        let result = await getBrands();
        return res.status(200).json({
            message: "Brands fetched successfully",
            category: result
        });
    } catch (err) {
        console.error("Error fetching brands:", err);
        return res.status(500).json({ message: "Internal server error" });
    }

});

router.get("/products", async (req, res) => {
    try {
        const { searchTerm, categoryId, brandId, pageNo = 1, pageSize = 10, sortBy = 'price', sortOrder = -1 } = req.query;
        const products = await getProductForListing(searchTerm, categoryId, brandId, Number(pageNo), Number(pageSize), sortBy, Number(sortOrder));
        return res.status(200).json({
            message: "Products fetched successfully",
            products: products
        });
    } catch (err) {
        console.error("Error fetching products:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/product/:id", async (req, res) => {
    try {
        const id = req.params["id"];
        const product = await getProductById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json({
            message: "Product fetched successfully",
            product: product
        });
    } catch (err) {
        console.error("Error fetching product with id:" + id, err);
        return res.status(500).json({ message: "Internal server error" });
    }
})

router.get("/wishlist", async (req, res) => {
    try {
        const userId = req.user.id;
        const products = await getWishlist(userId);
        return res.status(200).json({
            message: "Wishlisted Products fetched successfully",
            wishlist: products
        });
    } catch (err) {
        console.error("Error fetching Wishlisted products", err);
        return res.status(500).json({ message: "Internal server error" });
    }
})

router.post("/wishlist/:id", async (req, res) => {
    try {
        const userId = req.user.id;
        const productId = req.params.id;
        const products = await addToWishlist(userId, productId);
        return res.status(200).json({
            message: "Added Wishlisted Product successfully",
            wishlist: products
        });
    } catch (err) {
        console.error("Error adding Wishlisted products", err);
        return res.status(500).json({ message: "Internal server error" });
    }
})

router.delete("/wishlist/:id", async (req, res) => {
    try {
        const userId = req.user.id;
        const productId = req.params.id;
        await removeFromWishlist(userId, productId);
        return res.status(200).json({
            message: "Removed Wishlisted Product successfully",
        });
    } catch (err) {
        console.error("Error removing Wishlisted products", err);
        return res.status(500).json({ message: "Internal server error" });
    }
})

router.get("/cart", async (req, res) => {
    try {
        const userId = req.user.id;
        const items = await getCart(userId);
        return res.status(200).json({
            message: "Fetched shopping cart items successfully",
            items: items
        });
    } catch (err) {
        console.error("Error fetching shopping cart items", err);
        return res.status(500).json({ message: "Internal server error" });
    }
})


router.post("/cart/:id", async (req, res) => {
    try {
        const userId = req.user.id;
        const productId = req.params.id;
        const quantity = req.body.quantity;
        const items = await addToCart(userId, productId, quantity);
        return res.status(200).json({
            message: "Added items to shopping cart successfully",
            items: items
        });
    } catch (err) {
        console.error("Error adding items to shopping cart", err);
        return res.status(500).json({ message: "Internal server error" });
    }
})

router.delete("/cart/:id", async (req, res) => {
    try {
        const userId = req.user.id;
        const productId = req.params.id;
        const items = await removeFromCart(userId, productId);
        return res.status(200).json({
            message: "Removed items from shopping cart successfully",
            items: items
        });
    } catch (err) {
        console.error("Error removing items from shopping cart", err);
        return res.status(500).json({ message: "Internal server error" });
    }
})

router.post("/order", async (req, res) => {
    try {
        const userId = req.user.id;
        const order = req.body.order;
        await addOrder(userId, order);
        await clearCart(userId);
        return res.status(200).json({
            message: "Order Created",
        });
    } catch (err) {
        console.error("Error creating order", err);
        return res.status(500).json({ message: "Internal server error" });
    }
})

router.get("/orders", async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await getCustomerOrders(userId);
        return res.status(200).json({
            message: "Fetched customer orders successfully",
            orders: orders
        });
    } catch (err) {
        console.error("Error fetching customer orders", err);
        return res.status(500).json({ message: "Internal server error" });
    }
})

module.exports = router;