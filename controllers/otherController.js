import { catchAsyncError } from "../middlewares/catchAsynError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendEmail } from "../utils/sendEmail.js";

export const contact = catchAsyncError(async (req, res, next) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message)
    return next(new ErrorHandler("Please enter all fields", 400));

  const to = process.env.MY_MAIL;
  const subject = "Contact From CourseBundler";
  const text = `I am ${name} and my Email is ${email}. ${message}`;
  await sendEmail(to, subject, text);

  res.status(200).json({
    success: true,
    messsage: "Your message has been send",
  });
});

export const courseRequest = catchAsyncError(async (req, res, next) => {
  const { name, email, course } = req.body;

  if (!name || !email || !course)
    return next(new ErrorHandler("Please enter all fields", 400));

  const to = process.env.MY_MAIL;
  const subject = "Request for a Course on CourseBundler";
  const text = `I am ${name} and my Email is ${email}.\n ${course}`;

  await sendEmail(to, subject, text);

  res.status(200).json({
    success: true,
    messsage: "Your Request has been send",
  });
});

export const getDashboardStats = catchAsyncError(async (req, res, next) => {
  res.status(200).json({
    success: true,
  });
});
