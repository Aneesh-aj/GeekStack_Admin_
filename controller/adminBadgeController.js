const Badge = require("../model/badgeModel");

async function createBadge(req, res) {
    try {
        const { badgeName, startDate, endDate, categoryIcon } = req.body;
        console.log(" body ",req.body)
        if (!badgeName || !startDate || !endDate || !categoryIcon) {
            return res.status(400).json({ message: "Provide Valid Data" });
        }

        const existingBadge = await Badge.findOne({
            badgeName: { $regex: new RegExp(`^${badgeName}$`, 'i') } 
        });

        if (existingBadge) {
            console.log(" already")
            return res.status(409).json({ message: "Badge already exists" });
        }

        const newBadge = await Badge.create({
            badgeName,
            badgeIcon: categoryIcon,
            startDate,
            endDate
        });

        if (newBadge) {
            console.log( ' new one ',newBadge)
            return res.status(201).json({ message: "Badge Created !!" ,badge:newBadge});
        }
        return res.status(400).json({ message: "Error While creating badge" });
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: "Internal Server Error" });
    }
}


async function getAllBadge(req,res){
    try{

        const badge = await Badge.find({deleted:false})
        console.log(" badge ",badge)
        if(badge){
            res.status(200).json({message:"Fetched Successfull !!",badge})
        }else{
            res.status(400).json({message:"Badge Not found!!"})
        }

    }catch(error){
        res.status(500).json({message:"Internal Server Error"})
    }
}

module.exports = { createBadge,getAllBadge};
