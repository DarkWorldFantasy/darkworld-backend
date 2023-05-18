const router = require("express").Router();
const categoryController = require("../controller/categoryController");
const authorize = require("../middleware/authorize");

router
    .route("/")
    .get(authorize, categoryController.getCategory)
    .post(authorize, categoryController.createCategory);
router.route("/:id").delete(authorize, categoryController.deleteCategory);

module.exports = router;
