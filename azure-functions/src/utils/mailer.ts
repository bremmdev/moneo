const nodemailer = require("nodemailer");

export const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const baseMailOptions = {
  from: process.env.EMAIL_USER, // Sender address
  to: process.env.EMAIL_USER, // List of recipients
};