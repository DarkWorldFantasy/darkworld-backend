const router = require("express").Router();
const cartController = require("../controller/cartController");
const authorize = require("../middleware/authorize");

router
    .route("/")
    .get(authorize, cartController.getCartById)
    .post(authorize, cartController.createCart);
router.route("/:id").delete(authorize, cartController.deleteCart);

module.exports = router;
