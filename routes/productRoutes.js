const express = require("express");
const productController = require("../controllers/productController");
const uploads = require("../middleware/imageUpload");
const { checkAuthentication } = require("../middleware/auth");

const router = express.Router();

router
    .route("/")
    .get(checkAuthentication, productController.getProducts)
    .post(uploads.array('img', 20), productController.postProduct);

router
    .route("/:productId")
    .get(productController.getProductById)
    .post(productController.deleteProduct);

// updated routes
router
    .route("/update/:productId")
    .get(productController.getUpdatePage)
    .post(uploads.array('img', 20), productController.updateProduct);

module.exports = router;
