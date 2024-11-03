const mongoose = require("mongoose");
const adsModel = require("../model/adsModel");

async function createAds(req, res) {
    try {
        const { business, dayLimit, adName, budget, startDate, endDate, isUntilTurnOff, images } = req.body;
        console.log("Request body:", req.body);

        if (!business || !dayLimit || !adName || !budget || !startDate || !endDate || !images) {
            console.log(" 1")
            return res.status(400).json({ message: "All fields are required." });
        }
      


        if (!mongoose.Types.ObjectId.isValid(business)) {
            return res.status(400).json({ message: "Invalid business ID format." });
        }

        const businessObjectId = new mongoose.Types.ObjectId(business);

        const existingAd = await adsModel.findOne({ campaignName: adName, business: businessObjectId });
        if (existingAd) {
            return res.status(409).json({ message: "An ad with this name already exists for the specified business." });
        }

        const ads = await adsModel.create({
            campaignName: adName,
            business: businessObjectId,
            dayLimit,
            campaignBudget: budget,
            campaignStartDate: startDate,
            campaignEndDate: endDate,
            stopCampaign: isUntilTurnOff,
            banner: images,
        });

        if (ads) {
            res.status(201).json({ message: "Ad created successfully.", ads });
        } else {
            res.status(400).json({ message: "Error while creating the ad." });
        }

    } catch (error) {
        console.error("Error creating ad:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}

async function getAllAdsDetails(req, res) {
    try {
        const ads = await adsModel.find().populate('business');
        console.log(" ads ", ads)
        res.status(200).json({ ads: ads });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = { createAds, getAllAdsDetails };
