import express from "express";
import {
  addLecture,
  createCourse,
  getAllCourses,
  getCourseLecture,
} from "../controllers/courseController.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();

//Get All courses without Lectures
router.route("/courses").get(getAllCourses);

//create new course only admin
router.route("/createcourse").post(singleUpload, createCourse);

router
  .route("/course/:id")
  .get(getCourseLecture)
  .post(singleUpload, addLecture);

export default router;
