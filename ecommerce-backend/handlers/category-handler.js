const Category = require("../db/category");

async function getCategory() {
    let categories = await Category.find();
    return categories.map((category) => category.toObject());
}

async function addCategory(categoryName) {
    let category = new Category({
        name: categoryName
    });
    await category.save();
    return category.toObject();
}

async function updateCategory(id, categoryName) {
    const updatedCategory = await Category.findOneAndUpdate(
        { _id: id },
        { name: categoryName },
        { new: true, runValidators: true }
    )
    return updatedCategory ? updatedCategory.toObject() : null;
}

async function deleteCategory(id) {
    const deleteCategory = await Category.findOneAndDelete({ _id: id });
    return deleteCategory ? deleteCategory.toObject() : null;
}

async function getCategoryById(id) {
    let category = await Category.findById(id);
    return category ? category.toObject() : null;
}

module.exports = { addCategory, updateCategory, deleteCategory, getCategory, getCategoryById };