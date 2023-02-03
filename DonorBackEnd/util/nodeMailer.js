const config = require("config");

const transporter = nodemailer.createTransport({
  port: 465, // true for 465, false for other ports
  host: "smtp.gmail.com",
  auth: {
    user: config.get("gmail"),
    pass: config.get("gmailPassword"),
  },
  secure: true,
});

module.exports = transporter;
