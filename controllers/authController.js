const dotenv = require("dotenv");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

exports.getRegisterPage = async (req, res) => {
    try {
        res.render("register");
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong"});
    }
};

exports.registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Missing Username || Password" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            username,
            password: hashedPassword,
            isAdmin: true
        });

        await user.save();

        // res.status(201).json({ message: "Success", user });
        res.redirect("/auth/login");
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong"});
    }
}

exports.getLoginPage = async (req, res) => {
    try {
        res.render("login");
    } catch (error) {
        console.log(error);
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if(!user) {
            return res.status(401).json({ message: "User Not Found" });
        }

        const comparePassword = await bcrypt.compare(password, user.password);

        if(!comparePassword){
            return res.status(401).json({ message: "Incorrect Password" });
        }

        const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: "1hr" });

        // res.status(200).json({ message: "Login Success", token });
        res.cookie("token", token, { httpOnly: true });
        res.redirect("/admin");
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

//logout

exports.logoutUser = (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
};