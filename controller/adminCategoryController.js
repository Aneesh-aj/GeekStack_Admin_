const CategoryModel = require("../model/categoryModel");

async function createCategory(req, res) {
    try {
        const { categoryIcon, categoryName, subCategory } = req.body;

        const ress = await CategoryModel.find({})

        if(!categoryIcon || !categoryName || !subCategory){
            return res.status(400).json({message:"Provide valid Data"})
        }

        const existingCategory = await CategoryModel.findOne({
            categoryName: { $regex: new RegExp(`^${categoryName}$`, "i") } 
        });

        if (existingCategory) {
            return res.status(400).json({ message: "Category name must be unique." });
        }

        const category = await CategoryModel.create({ categoryIcon, categoryName, subCategory });
         console.log(" category",category)
        if (category) {
            return res.status(201).json({ message: 'Created successfully', category });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


async function getAllCategory(req,res){
    try{
        const category = await CategoryModel.find()
        console.log(" the ",category)

        return res.status(200).json({message:"Data fetched",category:category})
    }catch(error){
        res.status(500).json({message:"Internal Server Error"})
    }
}

module.exports = { createCategory , getAllCategory};
