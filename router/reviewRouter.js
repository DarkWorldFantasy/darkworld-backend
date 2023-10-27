const router = require("express").Router();
const reviewController = require("../controller/reviewController");
const authorize = require("../middleware/authorize");

router
    .route("/")
    .get(authorize, reviewController.getReview)
    .post(authorize, reviewController.createReview);
router
    .route("/:id")
    .get(authorize, reviewController.getReviewById)
    .put(authorize, reviewController.updateReview)
    .delete(authorize, reviewController.deleteReview);

module.exports = router;
