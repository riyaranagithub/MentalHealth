
export const validatePassword = (password) => {
  if (!password || password.trim() === "") {
    return { valid: false, message: "Password is required" };
  }

  if (password.length < 8) {
    return { valid: false, message: "Password must be at least 8 characters long" };
  }

  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: "Password must include at least one uppercase letter" };
  }

  if (!/[a-z]/.test(password)) {
    return { valid: false, message: "Password must include at least one lowercase letter" };
  }

  if (!/[0-9]/.test(password)) {
    return { valid: false, message: "Password must include at least one number" };
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return { valid: false, message: "Password must include at least one special character" };
  }

  return { valid: true };
};
