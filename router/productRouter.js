const router = require("express").Router();
const productController = require("../controller/productController");
const authorize = require("../middleware/authorize");

router
    .route("/")
    .get(authorize, productController.getProduct)
    .post(authorize, productController.createProduct);
router.route("/getPhoto/:id").get(productController.getPhotoById);
router
    .route("/:id")
    .get(authorize, productController.getProductById)
    .put(authorize, productController.updateProduct)
    .delete(authorize, productController.deleteProduct);

module.exports = router;
