const userRouter = require("../router/userRouter");
const categoryRouter = require("../router/categoryRouter");
const reviewRouter = require("../router/reviewRouter");
const entertainerRouter = require("../router/entertainerRouter");
const cartRouter = require("../router/cartRouter");
const orderRouter = require("../router/orderRouter");
const postRouter = require("../router/postRouter");
const userProductInteractionRouter = require("../router/userProductInteractionRouter");

module.exports = (app) => {
    app.use("/user/", userRouter);
    app.use("/category", categoryRouter);
    app.use("/review", reviewRouter);
    app.use("/interaction", userProductInteractionRouter);
    app.use("/entertainer", entertainerRouter);
    app.use("/cart", cartRouter);
    app.use("/order", orderRouter);
    app.use("/post", postRouter);
};
