const express = require("express");
const router = express.Router();
const Product = require("../db/product");
const { addProduct, deleteProduct, updateProduct, getProducts, getProductById } = require("../handlers/product-handler");

router.post("", async (req, res) => {
    try {
        const product = req.body;
        let result = await addProduct(product);
        return res.status(201).json({
            message: "Product created successfully",
            product: result
        });
    } catch (err) {
        console.error("Error saving product:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
})

router.put("/:id", async (req, res) => {
    try {
        const product = req.body;
        let id = req.params.id;
        let result = await updateProduct(id, product)
        if (!result) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json({
            message: "Product updated successfully",
            product: result
        });
    }
    catch (err) {
        console.error("Error updating product:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let result = await deleteProduct(id);
        if (!result) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json({
            message: "Product deleted successfully",
            product: result
        });
    }
    catch (err) {
        console.error("Error deleting product:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
})

router.get("/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let result = await getProductById(id);
        return res.status(200).json({
            message: "Product fetched successfully",
            product: result
        });
    }
    catch (err) {
        console.error("Error getting product:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
})

router.get("", async (req, res) => {
    try {
        let result = await getProducts();
        return res.status(200).json({
            message: "Products fetched successfully",
            products: result
        });
    } catch (err) {
        console.error("Error fetching product:", err);
        return res.status(500).json({ message: "Internal server error" });
    }

});
module.exports = router;