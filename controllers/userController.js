import { catchAsyncError } from "../middlewares/catchAsynError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { User } from "../models/User.js";
import { sendToken } from "../utils/sendToken.js";
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
