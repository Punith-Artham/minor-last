export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken(); // Generate JWT

  // Ensure COOKIE_EXPIRE is a number and calculate the expiration in milliseconds
  const expiresIn = process.env.COOKIE_EXPIRE ? Number(process.env.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000; // Default to 7 days if COOKIE_EXPIRE is not set
  const cookieExpireDate = new Date(Date.now() + expiresIn); // Calculate the expiration date as a Date object

  res
    .status(statusCode)
    .cookie("token", token, {
      expires: cookieExpireDate,  // Set the expires option to the calculated Date object
      httpOnly: true,  // Ensures cookie is not accessible via JavaScript
      secure: process.env.NODE_ENV === "production",  // Only send cookie over HTTPS in production
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};
