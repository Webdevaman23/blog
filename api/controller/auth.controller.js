import bcryptjs from "bcryptjs";
import User from "../models/userModel.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

// signup
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    (!username,
    !email,
    !password,
    username === "",
    email === "",
    password === "")
  ) {
    next(errorHandler(400, "All fields are required"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    const data = await newUser.save();
    res.status(200).json({ message: "Signup successfull" , data });
  } catch (error) {
    next(error);
  }
};

// signin
export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
   return next(errorHandler(400, "All fields are required"));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
     return next(errorHandler(404, "User not found"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid Password"));
    }

    const {password : pass , ...rest} = validUser._doc;

    const token = jwt.sign({id : validUser._id} ,
        process.env.JWT_SECRET , {expiresIn : '1d'});

    res.status(200).cookie("access token" , token , {httpOnly : true}).json({message : "Signin succesfull" , rest});

  } catch (error) {
    next(error)
  }
};
