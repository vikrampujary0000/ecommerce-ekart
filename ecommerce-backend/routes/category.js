const express = require("express");
const router = express.Router();
const { addCategory, updateCategory, deleteCategory, getCategory, getCategoryById } = require("../handlers/category-handler");

router.get("", async (req, res) => {
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



router.post("", async (req, res) => {
    try {
        const { name } = req.body;
        if (!name || name.trim() === '') {
            return res.status(400).json({ message: 'Category name is required' });
        }
        let result = await addCategory(name);
        return res.status(201).json({
            message: "Category created successfully",
            category: result
        });
    } catch (err) {
        console.error("Error saving category:", err);
        return res.status(500).json({ message: "Internal server error" });
    }

});

router.put("/:id", async (req, res) => {
    try {
        const { name } = req.body;
        if (!name || name.trim() === '') {
            return res.status(400).json({ message: 'Category name is required' });
        }
        let id = req.params.id;
        let result = await updateCategory(id, name)
        if (!result) {
            return res.status(404).json({ message: "Category not found" });
        }
        return res.status(200).json({
            message: "Category updated successfully",
            category: result
        });
    }
    catch (err) {
        console.error("Error updating category:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let result = await deleteCategory(id);
        if (!result) {
            return res.status(404).json({ message: "Category not found" });
        }
        return res.status(200).json({
            message: "Category deleted successfully",
            category: result
        });
    }
    catch (err) {
        console.error("Error deleting category:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
})

router.get("/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let result = await getCategoryById(id);
        return res.status(200).json({
            message: "Category fetched successfully",
            category: result
        });
    }
    catch (err) {
        console.error("Error getting category:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
})

module.exports = router;