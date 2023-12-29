const router = require("express").Router();
const roleController = require("../controller/roleController");
const authorize = require("../middleware/authorize");

router
    .route("/")
    .get(authorize, roleController.getRole)
    .post(authorize, roleController.createRole);
router.route("/:id").delete(authorize, roleController.deleteRole);

module.exports = router;
