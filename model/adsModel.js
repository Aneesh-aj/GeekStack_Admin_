const mongoose = require("mongoose");

const adsSchema = new mongoose.Schema({
    campaignName: { type: String, required: true },
    business: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Business' },
    banner: [{ type: String, required: true }],
    dayLimit: { type: String, required: true },
    campaignBudget: { type: String, required: true },
    campaignStartDate: { type: Date, required: true },
    campaignEndDate: { type: Date, required: true },
    deleteCampaign: { type: Boolean, default: false },
    stopCampaign: { type: Boolean, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Ads", adsSchema);
