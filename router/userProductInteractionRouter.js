const router = require("express").Router();
const userProductInteractionController = require("../controller/userProductInteractionController");
const authorize = require("../middleware/authorize");

router
    .route("/")
    .post(authorize, userProductInteractionController.createInteraction)
    .get(authorize, userProductInteractionController.getInteractionById);

module.exports = router;
