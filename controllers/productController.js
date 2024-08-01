const path = require("path");
const fs = require("fs");
const filename = require("../middleware/imageUpload");
const Product = require("../models/Product");

//get products
exports.getProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6;
        const skip = (page - 1) * limit;

        const totalProducts = await Product.countDocuments();
        const products = await Product.find().skip(skip).limit(limit);

        const featuredProducts = await Product.find().sort({ createdAt: -1 }).limit(3);

        if (req.user.isAuthenticated) {
            res.render('account-products', { products });
        } else {
            res.render('products', { 
                products, 
                featuredProducts,
                currentPage: page,
                totalPages: Math.ceil(totalProducts / limit)
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

// return one product by id
exports.getProductById = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findOne({ _id: productId });

        const products = await Product.find();

        res.render("product", { product, products });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong"});
    }
}

//post a product
exports.postProduct = async (req, res) => {
    try {
        const { name, content, price, reducedPrice, stock, sold, reviews, category } = req.body;
        const files = req.files;
        const images = files ? files.map(file => file.filename) : [];

        if (!name) {
            return res.status(403).json({ message: "Name and content are required" });
        }

        const product = new Product({ name, content, price, reducedPrice, stock, sold, reviews, category, images });
        await product.save();
        res.redirect("/products");
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

// delete product
exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.body.deleteBtn;
  
        // Find the product by Id
        const product = await Product.findById(productId);
  
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
  
        // Delete associated images in the uploads dir
        if (product.images && Array.isArray(product.images)) {
            for (const image of product.images) {
                const imgPath = path.join(__dirname, '../public/uploads', image);
                if (fs.existsSync(imgPath)) {
                    fs.unlinkSync(imgPath);
                }
            }
        }
  
        // Remove the product from the database
        await Product.findByIdAndDelete(productId);
  
        res.redirect("/products");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

