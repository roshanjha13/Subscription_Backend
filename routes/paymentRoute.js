import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  buySubscription,
  cancelSubscription,
  getRazorPayKey,
  paymentVerification,
} from "../controllers/paymentController.js";

const router = express.Router();

//Buy subscription
router.route("/subscribe").get(isAuthenticated, buySubscription);

//Get Razorpay key
router.route("/razorpaykey").get(getRazorPayKey);

//Verify paymnet and save referencing database
router.route("/paymentverification").post(isAuthenticated, paymentVerification);

//cancel subscription
router.route("/subscribe/cancel").delete(isAuthenticated, cancelSubscription);

export default router;
