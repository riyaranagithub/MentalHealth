import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    minlength: [3, "Username must be at least 3 characters long"],
    maxlength: [30, "Username cannot exceed 30 characters"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function(value) {
        // console.log("Email validator running....");
        return validator.isEmail(value);
      },
      message: "Please provide a valid email address",
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
      validate: {
      validator: function (value) {
        console.log("Password validator running...");
        return validator.isStrongPassword(value, {
          minLength: 8,
          minUppercase: 1,
          minLowercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        });
      },
      message: "Password must be at least 8 characters long, including 1 uppercase, 1 lowercase, 1 number, and 1 special character",
    },
  },
});

userSchema.methods.getJwt= function () {
  const user=this;
   const token = jwt.sign({ _id: user._id, email: user.email,username : user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
   return token;
  
}


const User = mongoose.model("User", userSchema);
export default User;
