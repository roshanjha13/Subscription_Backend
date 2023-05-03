import { catchAsyncError } from "../middlewares/catchAsynError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { User } from "../models/User.js";
import { sendToken } from "../utils/sendToken.js";
import { sendEmail } from "../utils/sendEmail.js";

export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return next(new ErrorHandler("Please enter all fields", 400));

  let user = await User.findOne({ email });

  if (user) return next(new ErrorHandler("User Already Exist", 409));
  // upload file on cludinary

  user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "tempId",
      url: "tempUrl",
    },
  });
  sendToken(res, user, "Registered Successfully", 201);
});

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  console.log("email", email, "password", password);
  if (!email || !password)
    return next(new ErrorHandler("Please enter all fields", 400));

  const user = await User.findOne({ email }).select("+password");

  if (!user) return next(new ErrorHandler("Incorrect Email or Password", 401));
  // upload file on cludinary

  const isMatch = await user.comparePassword(password);
  if (!isMatch)
    return next(new ErrorHandler("IncorrectEmail or Password", 401));

  sendToken(res, user, `Welcome back,${user.name}`, 200);
});

export const logout = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged Out Successfully",
    });
});

export const getMyProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({
    success: true,
    user,
  });
});

export const changedPassword = catchAsyncError(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword)
    return next(new ErrorHandler("Please enter all fields", 400));

  const user = await User.findById(req.user._id).select("+password");

  const isMatch = await user.comparePassword(oldPassword);

  if (!isMatch) return next(new ErrorHandler("Incorrect  old Password", 400));

  user.password = newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: "pass word change successfully",
  });
});

export const updateProfile = catchAsyncError(async (req, res, next) => {
  const { name, email } = req.body;
  //   if (!name || !email)
  //     return next(new ErrorHandler("Please enter all fields", 400));

  const user = await User.findById(req.user._id);

  if (name) user.name = name;
  if (email) user.email = email;

  await user.save();
  res.status(200).json({
    success: true,
    message: "Profile Updated successfully",
  });
});

export const updateProfilePicture = catchAsyncError(async (req, res, next) => {
  //cloudinary Todo

  res.status(200).json({
    success: true,
    message: "Profile Picture Updated Successfully",
  });
});

export const forgetPassword = catchAsyncError(async (req, res, next) => {
  //cloudinary Todo
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) return next(new ErrorHandler("User Not Found", 400));

  const resetToken = await user.getResetToken();

  const url = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

  const message = `Click on the link to reset your password.${url}.
  If you have not request then please ignore`;
  //Send token via email
  await sendEmail(user.email, "CourseBundler Reset Password", message);

  res.status(200).json({
    success: true,
    message: `Reset Token has been sent to ${user.email}`,
  });
});
export const resetPassword = catchAsyncError(async (req, res, next) => {
  //cloudinary Todo

  res.status(200).json({
    success: true,
    message: "Profile Picture Updated Successfully",
  });
});
