const mongoose = require("mongoose");
const Business = require("../model/businessModel")

async function createBusiness(req, res) {
    try {
        console.log("Request Body:", req.body);

        const {
            businessName,
            businessCategory,
            businessSubCategory,
            logo,
            badge,
            url,
            latitude,
            longitude,
            phoneNumber,
            whatsAppAvailable,
            websiteLink,
            facebookLink,
            instagramLink,
            youtubeLink,
            xLink
        } = req.body;

        const existingBusiness = await Business.findOne({ businessName: new RegExp(`^${businessName}$`, 'i') }); 
       console.log(" exist ",existingBusiness);
       
        if (existingBusiness) {
            return res.status(409).json({ message: "Business with this name already exists." });
        }

        const badgeIds = badge.map(b => new mongoose.Types.ObjectId(b.value));

        const newBusiness = await Business.create({
            businessName,
            businessCategory: new mongoose.Types.ObjectId(businessCategory), 
            businessSubCategory,
            logo,
            badge: badgeIds,
            url,
            latitude,
            longitude,
            phoneNumber,
            whatsAppAvailable,
            websiteLink,
            facebookLink,
            instagramLink,
            youtubeLink,
            xLink
        })

        console.log("Created Business:", newBusiness);
        if(newBusiness){
           return res.status(201).json({message:"Business Created!!",business:newBusiness})
        }

        return res.status(400).json({message:"Error while creating"})
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = { createBusiness };




async function getBusinessDetails(req, res) {
   try {
       const businesses = await Business.find()
           .populate('badge') 
           .populate('businessCategory');
           console.log( businesses)
           console.log(businesses[0].badge)

       if (businesses.length > 0) {
           return res.status(200).json({businesses:businesses});
       } else {
           return res.status(404).json({ message: "No businesses found" });
       }
   } catch (error) {
       console.error(error); 
       return res.status(500).json({ message: "Internal Server Error" });
   }
}


async function getAllBusiness(req,res){
   try{
        const allBusiness = await Business.find()

        if(allBusiness){
           return res.status(200).json({allBusiness})
        }
   }catch(error){
       return res.status(500).json({message:"Internal Server Error"})
   }
}



module.exports = { createBusiness,getBusinessDetails,getAllBusiness };
