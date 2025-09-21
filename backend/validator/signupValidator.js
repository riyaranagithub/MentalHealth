import validator from "validator";
import { validatePassword } from "./validatePassword.js";

export const validateSignupData = (data) => {
  const username = data.username?.trim();
  const email = data.email?.trim();
  const password = data.password?.trim();

  console.log("Validating signup data:", { username, email, password }, data);

  if (!username ) {
    return { valid: false, message: "Username is required" };
  }

  if (username.length < 3 || username.length > 30) {
    return { valid: false, message: "Username must be between 3 and 30 characters long" };
  }

  if (!/^(?=.*[a-zA-Z])[a-zA-Z0-9]+$/.test(username)) {
  return { valid: false, message: "Username must contain letters and can include numbers (alphanumeric)" };
}


  if (!email) {
    return { valid: false, message: "Email is required" };
  }

  if (!validator.isEmail(email)) {
    return { valid: false, message: "Invalid email format" };
  }

  // Use reusable password validator
  const passwordValidation = validatePassword(password);
  if (!passwordValidation.valid) {
    return passwordValidation;
  }

  return { valid: true };
};
