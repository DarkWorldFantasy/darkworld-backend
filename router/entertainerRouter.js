const router = require("express").Router();
const entertainerController = require("../controller/entertainerController");
const authorize = require("../middleware/authorize");

router
    .route("/")
    .get(authorize, entertainerController.getEntertainer)
    .post(authorize, entertainerController.createEntertainer);
router
    .route("/:id")
    .get(authorize, entertainerController.getEntertainerById)
    .put(authorize, entertainerController.updateEntertainer)
    .delete(authorize, entertainerController.deleteEntertainer);

router.route("/getProfile/:id").get(entertainerController.getProfliePhoto);

module.exports = router;
