const router = require("express").Router();
const providerController = require("../controller/providerController");

router
    .route("/")
    .get(providerController.getProvider)
    .post(providerController.createProvider);
router
    .route("/:id")
    .get(providerController.getProviderById)
    .put(providerController.updateProvider)
    .delete(providerController.deleteProvider);

module.exports = router;
