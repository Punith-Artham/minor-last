import nodeMailer from "nodemailer";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

export const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,  // Plain text message
    html: `<p>${options.message}</p>`, // Optional: HTML version
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email: ", error);
  }
};
