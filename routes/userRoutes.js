import express from "express";
import {
  addToPlaylist,
  changedPassword,
  forgetPassword,
  getMyProfile,
  login,
  logout,
  register,
  removeFromPlaylist,
  resetPassword,
  updateProfile,
  updateProfilePicture,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();

router.route("/register").post(singleUpload, register);

router.route("/login").post(login);

router.route("/logout").get(logout);

router.route("/me").get(isAuthenticated, getMyProfile);

router.route("/changedpassword").put(isAuthenticated, changedPassword);

router.route("/updateprofile").put(isAuthenticated, updateProfile);

router
  .route("/updateprofilepicture")
  .put(isAuthenticated, singleUpload, updateProfilePicture);

router.route("/forgetpassword").post(forgetPassword);

router.route("/addtoplaylist").post(isAuthenticated, addToPlaylist);
router.route("/removefromplaylist").delete(isAuthenticated, removeFromPlaylist);

router.route("/resetpassword/:token").put(resetPassword);

export default router;
