const router = require("express").Router();
const orderController = require("../controller/orderController");
const authorize = require("../middleware/authorize");

router
    .route("/")
    .get(authorize, orderController.getOrderById)
    .post(authorize, orderController.createOrder);

router.route("/orders/").get(authorize, orderController.getOrder);
router.route("/recent/").get(authorize, orderController.recentOrder);
router
    .route("/:id")
    .put(authorize, orderController.updateOrder)
    .delete(authorize, orderController.deleteOrder);
router.route("/:productId/").get(authorize, orderController.latestOrderByUser);

module.exports = router;
