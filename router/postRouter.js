const router = require("express").Router();
const postController = require("../controller/postController");
const authorize = require("../middleware/authorize");

router
    .route("/")
    .get(authorize, postController.getPostByUserId)
    .post(authorize, postController.createPost);

router.route("/posts/").get(authorize, postController.getPost);

router
    .route("/:id")
    .get(authorize, postController.getPostById)
    .put(authorize, postController.updatePost)
    .delete(authorize, postController.deletePost);

router
    .route("/:postId/:commentId")
    .put(authorize, postController.deleteComment);

module.exports = router;
