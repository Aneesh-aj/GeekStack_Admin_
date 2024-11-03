const { default: mongoose } = require("mongoose");

const categoryModel = new mongoose.Schema({
    categoryName: { type: String, required: true },
    categoryIcon: { type: String, required: true },
    subCategory: { type: Array, required: true },
    deleted:{type:Boolean,default:false},
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Category', categoryModel);

