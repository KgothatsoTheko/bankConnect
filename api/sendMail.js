const nodemailer = require("nodemailer");
require('dotenv').config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: 'kgothatsotheko7@gmail.com',
      pass: 'iufxeixemilgnutd',
    },
    tls: {
        rejectUnauthorized: false // Ignore certificate validation errors
    }
  });

const mailOptions = {
    from: {
        name: "Kgothatso Theko",
        address: "kgothatsotheko7@gmail.com"
    }, // sender address
    to: "ktsupreme17@gmail.com", // list of receivers
    subject: "New Account Created", // Subject line
    text: "Account successfully created, You can proceed to login using your created credentials", // plain text body
    html: "<b>Account successfully created, You can proceed to login using created credentials</b>", // html body
}

const sendMail = async (transporter, mailOptions) => {
    try {
        await transporter.sendMail(mailOptions)
        console.log('Email has been sent')
    } catch (error) {
        console.error(error)
    }
}

sendMail(transporter, mailOptions)