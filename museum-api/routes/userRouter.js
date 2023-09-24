const express = require("express");
const userController = require("../controllers/userController");
const auth = require("../services/auth");

const userRouter = express.Router();

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.post("/google-auth", userController.googleAuth);

userRouter.get("/payments", auth.checkToken, userController.listPayments);
userRouter.get(
  "/payments/:id",
  auth.checkToken,
  userController.findPaymentById
);
userRouter.post(
  "/exhibitions/buy-tickets",
  auth.checkToken,
  userController.buyTickets
);
userRouter.get(
  "/exhibition-orders",
  auth.checkToken,
  userController.listExhibitionOrders
);

module.exports = userRouter;
