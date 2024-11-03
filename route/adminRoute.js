
const express = require("express")
const businessController = require("./../controller/adminBusinessController")
const categoryController = require("./../controller/adminCategoryController")
const adsController = require("../controller/adminAdsController")
const badgeController = require("../controller/adminBadgeController")
const auth = require("./../middleware/authMiddleware")
const router = express.Router()

// router.post("/businessData-submition",auth,businessController.adminBusinessCreation)

// Category Routes
router.post("/createCategory",categoryController.createCategory)
router.get("/getAllCategory",categoryController.getAllCategory)


// Badge Routes
router.post("/createBadge",badgeController.createBadge)
router.get('/getAllBadge',badgeController.getAllBadge)

//Business Route
router.post("/createBusiness",businessController.createBusiness)
router.get("/getAllBusiness",businessController.getAllBusiness)
router.get("/getAllBusinessDetails",businessController.getBusinessDetails)

//Ads Routes
router.post("/createAds",adsController.createAds)
router.get("/getAllAdsDetails",adsController.getAllAdsDetails)




module.exports = router