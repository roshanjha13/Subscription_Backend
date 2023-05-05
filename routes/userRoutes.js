import express from "express";
import {
  addToPlaylist,
  changedPassword,
  deleteMyProfile,
  deleteUser,
  forgetPassword,
  getAllUsers,
  getMyProfile,
  login,
  logout,
  register,
  removeFromPlaylist,
  resetPassword,
  updateProfile,
  updateProfilePicture,
  updateUserRole,
} from "../controllers/userController.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();

router.route("/register").post(singleUpload, register);

router.route("/login").post(login);

router.route("/logout").get(logout);

router.route("/me").get(isAuthenticated, getMyProfile);

router.route("/me").delete(isAuthenticated, deleteMyProfile);

router.route("/changedpassword").put(isAuthenticated, changedPassword);

router.route("/updateprofile").put(isAuthenticated, updateProfile);

router
  .route("/updateprofilepicture")
  .put(isAuthenticated, singleUpload, updateProfilePicture);

router.route("/forgetpassword").post(forgetPassword);

router.route("/addtoplaylist").post(isAuthenticated, addToPlaylist);
router.route("/removefromplaylist").delete(isAuthenticated, removeFromPlaylist);

router.route("/resetpassword/:token").put(resetPassword);

router.route("/admin/users").get(isAuthenticated, authorizeAdmin, getAllUsers);
router
  .route("/admin/user/:id")
  .put(isAuthenticated, authorizeAdmin, updateUserRole);

router
  .route("/admin/user/:id")
  .delete(isAuthenticated, authorizeAdmin, deleteUser);
export default router;
