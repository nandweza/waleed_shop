const express = require("express");
const adminController = require("../controllers/adminController");
const { checkAuthentication } = require("../middleware/auth");

const router = express.Router();

router
    .route("/")
    .get(checkAuthentication, adminController.getAdmin);

module.exports = router;
