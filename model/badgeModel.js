const { default: mongoose } = require("mongoose");

const badgeModel = new mongoose.Schema({
    badgeName:{type:String,required:true},
    badgeIcon:{type:String,required:true},
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    deleted:{type:Boolean,default:false},
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Badge', badgeModel);

