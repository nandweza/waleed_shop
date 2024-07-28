const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require("dotenv");

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

exports.checkAuthentication = async (req, res, next) => {
    const token = req.cookies.token;
    req.user = { isAuthenticated: false }; // Default to not authenticated

    if (token) {
        try {
            const decoded = jwt.verify(token, jwtSecret);
            const user = await User.findById(decoded.userId);
            if (user) {
                req.user = { isAuthenticated: true, ...user.toObject() };
            }
        } catch (error) {
            console.log("Token verification failed:", error);
        }
    }
    next();
};
