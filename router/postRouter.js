const router = require("express").Router();
const postController = require("../controller/postController");
const authorize = require("../middleware/authorize");

router
    .route("/")
    .get(authorize, postController.getPostById)
    .post(authorize, postController.createPost);

router.route("/:id").delete(authorize, postController.deletePost);

router.route("/posts/").get(authorize, postController.getPost);

module.exports = router;
