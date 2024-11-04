const express = require("express");
const router = express.Router();
const { getBrands, getBrand, addBrand, updateBrand, deleteBrand } = require("../handlers/brand-handler.js");

router.get("", async (req, res) => {
    try {
        let result = await getBrands();
        return res.status(200).json({
            message: "Brands fetched successfully",
            brands: result
        });
    } catch (err) {
        console.error("Error fetching brands:", err);
        return res.status(500).json({ message: "Internal server error" });
    }

});

router.post("", async (req, res) => {
    try {
        let { name } = req.body;
        console.log(name);
        if (!name || name.trim() === '') {
            return res.status(400).json({ message: 'Brand name is required' });
        }
        let result = await addBrand(name);
        return res.status(201).json({
            message: "Brand created successfully",
            brand: result
        });
    }
    catch (err) {
        console.error("Error saving Brand:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
})

router.put("/:id", async (req, res) => {
    try {
        const { name } = req.body;
        if (!name || name.trim() === '') {
            return res.status(400).json({ message: 'Brand name is required' });
        }
        let id = req.params.id;
        let result = await updateBrand(id, name)
        if (!result) {
            return res.status(404).json({ message: "Brand not found" });
        }
        return res.status(200).json({
            message: "Brand updated successfully",
            brand: result
        });
    }
    catch (err) {
        console.error("Error updating brand:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let result = await deleteBrand(id);
        if (!result) {
            return res.status(404).json({ message: "Brand not found" });
        }
        return res.status(200).json({
            message: "Brand deleted successfully",
            brand: result
        });
    }
    catch (err) {
        console.error("Error deleting brand:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let result = await getBrand(id);
        return res.status(200).json({
            message: "Brand fetched successfully",
            brand: result
        });
    }
    catch (err) {
        console.error("Error getting brand:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
