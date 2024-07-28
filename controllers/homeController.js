const path = require("path");
const fs = require("fs");
const filename = require("../middleware/imageUpload");
const Product = require("../models/Product");

exports.getHome = async(req, res) => {
    try {
        const featuredProducts = await Product.find().limit(6);
        const latestProducts = await Product.find().sort({ createdAt: -1 });

        res.render("index", { featuredProducts, latestProducts });
    } catch (error) {
        console.log(error);
    }
}
