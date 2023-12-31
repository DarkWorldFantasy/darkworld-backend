const router = require("express").Router();
const wishlistController = require("../controller/wishlistController");
const authorize = require("../middleware/authorize");

router.route("/").post(authorize, wishlistController.createWishlist);

router.route("/user").get(authorize, wishlistController.getWishlistByUserId);
router
    .route("/:id")
    .get(authorize, wishlistController.getWishlistById)
    .delete(authorize, wishlistController.deleteWishlist);

module.exports = router;
