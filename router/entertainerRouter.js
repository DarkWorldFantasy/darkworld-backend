const router = require("express").Router();
const entertainerController = require("../controller/entertainerController");
const authorize = require("../middleware/authorize");

router
    .route("/filter")
    .post(authorize, entertainerController.getFilterEntertainer);
router
    .route("/")
    .get(authorize, entertainerController.getEntertainer)
    .post(authorize, entertainerController.createEntertainer);
router.route("/newArrival").get(authorize, entertainerController.newArrival);
router
    .route("/:id")
    .post(authorize, entertainerController.addPhotosById)
    .get(authorize, entertainerController.getEntertainerById)
    .put(authorize, entertainerController.updateEntertainer)
    .delete(authorize, entertainerController.deleteEntertainer);

router
    .route("/deletephoto/:id")
    .post(authorize, entertainerController.deletePhotoById);

router.route("/getProfile/:id").get(entertainerController.getProfliePhoto);

module.exports = router;
