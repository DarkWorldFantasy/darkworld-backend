const userRouter = require("../router/userRouter");
const categoryRouter = require("../router/categoryRouter");
const providerRouter = require("../router/providerRouter");
const productRouter = require("../router/productRouter");
const entertainerRouter = require("../router/entertainerRouter");
const cartRouter = require("../router/cartRouter");
const orderRouter = require("../router/orderRouter");
const postRouter = require("../router/postRouter");

module.exports = (app) => {
    app.use("/user/", userRouter);
    app.use("/category", categoryRouter);
    app.use("/provider", providerRouter);
    app.use("/product", productRouter);
    app.use("/entertainer", entertainerRouter);
    app.use("/cart", cartRouter);
    app.use("/order", orderRouter);
    app.use("/post", postRouter);
};
