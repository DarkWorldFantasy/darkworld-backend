const router = require("express").Router();
const userController = require("../controller/userController");

router.route("/signIn").post(userController.signIn);
router.route("/signUp").post(userController.signUp);

module.exports = router;
