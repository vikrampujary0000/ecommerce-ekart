const Brand = require("./../db/brand");

async function getBrands() {
    let brands = await Brand.find();
    return brands.map((brand) => brand.toObject());
}

async function getBrand(id) {
    let brand = await Brand.findById(id);
    return brand ? brand.toObject() : null;
}

async function addBrand(brandName) {
    let brand = new Brand({
        name: brandName
    })
    await brand.save();
    return brand.toObject();
}

async function updateBrand(id, brandName) {
    let brand = await Brand.findByIdAndUpdate(
        { _id: id },
        { name: brandName },
        { new: true, runValidators: true });
    return brand ? brand.toObject() : null;
}

async function deleteBrand(id) {
    let brand = await Brand.findByIdAndDelete({ _id: id });
    return brand ? brand.toObject() : null;
}

module.exports = { getBrands, getBrand, addBrand, updateBrand, deleteBrand };