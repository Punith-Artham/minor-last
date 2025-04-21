export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken(); // Generate JWT

  const expiresIn = process.env.COOKIE_EXPIRE ? Number(process.env.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000; // Default to 7 days if COOKIE_EXPIRE is not set
  const cookieExpireDate = new Date(Date.now() + expiresIn);

  res
    .status(statusCode)
    .cookie("token", token, {
      expires: cookieExpireDate,  
      httpOnly: true,  
      secure: process.env.NODE_ENV === "production",
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};
