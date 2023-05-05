import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  buySubscription,
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

export default router;
