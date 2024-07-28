const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router
    .route("/register")
    .get(authController.getRegisterPage)
    .post(authController.registerUser);

router
    .route("/login")
    .get(authController.getLoginPage)
    .post(authController.loginUser);

router
    .route("/logout")
    .get(authController.logoutUser);

module.exports = router;