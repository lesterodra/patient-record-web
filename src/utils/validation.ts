export const validateUsername = (username: string): string => {
  if (!username) {
    return "Username is required.";
  }

  if (username.length < 6) {
    return "Username must not less than 6 letters.";
  }

  if (/\s/g.test(username)) {
    return "Invalid username format, Please remove white space.";
  }

  return "";
};

export const validatePassword = (
  password: string,
  confirmPassword: string
): string => {
  if (!password) {
    return "Password is required.";
  }

  if (password.length < 8) {
    return "Password must not less than 8 letters.";
  }

  if (password !== confirmPassword) {
    return "Password and confirm password does not matched.";
  }

  return "";
};
