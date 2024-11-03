const mongoose = require("mongoose");

const businessModel = new mongoose.Schema({
    businessName: { type: String, required: true, unique: true }, // Ensure unique business names
    businessCategory: { type: mongoose.Types.ObjectId, ref: 'Category', required: true }, // Reference to Category model
    businessSubCategory: { type: String, required: true },
    logo: { type: String, required: true },
    badge: [{ type: mongoose.Types.ObjectId, ref: 'Badge', required: true }], // Reference to Badge model
    url: { type: String, required: true },
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    whatsAppAvailable: { type: Boolean, required: true, default: false },
    websiteLink: { type: String, required: true },
    facebookLink: { type: String },
    instagramLink: { type: String },
    youtubeLink: { type: String },
    xLink: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Business", businessModel);
