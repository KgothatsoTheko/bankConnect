const Customer = require('../models/customer.js')
const Login = require('../models/auth.js')
// const Role = require('../models/role.js')
// hash the password
const bcrypt = require('bcrypt')
// create json web token
const jwt = require('jsonwebtoken')
// Sending email
const sendMail = require('../sendMail.js');

module.exports = {
    registerRoute: async (req, res, next) => {
        try {
            const salt = await bcrypt.genSalt(10)
            const hashPin = await bcrypt.hash(req.body.pin, salt)
            const payload = { ...req.body, };
            payload.pin = hashPin
            const newCustomer = new Customer(payload)
            // const newLogin = new Login(payload)
            const result = await newCustomer.save()
            // const result = await newLogin.save()

             // Send email to the created email address
             const mailOptions = {
                from: {
                    name: "Kgothatso Theko",
                    address: "kgothatsotheko7@gmail.com"
                },
                to: req.body.email.toString(),
                subject: "New Account Created",
                text: "Account successfully created",
                html: "<b>Account successfully created</b>",
            };
            sendMail(mailOptions);

            res.status(201).send(result)
        } catch (error) {
            res.status(500).send(error)
        }
    },
    
    loginRoute: async (req, res, next) => {
        try {
            const customer = await Customer.findOne({ email: req.body.email })
    
            // If login not found, return 404
            if (!customer) {
                return res.status(404).send("User Not found!");
            }
    
            // Check if the PIN is correct
            const isPinCorrect = await bcrypt.compare(req.body.pin.toString(), customer.pin.toString());
            if (!isPinCorrect) {
                return res.status(404).send("Pin is Incorrect!");
            }
    
            // Generate JWT token
            const token = jwt.sign({
                id: customer._id,
                isAdmin: customer.isAdmin,
            }, process.env.JWT_SECRET);
    
            // Set the token as a cookie and send a response
            res.cookie("access_token", token, { httpOnly: true });
            res.status(200).json({
                status: 200,
                message: "Login Success",
                data: customer
            });
    
        } catch (error) {
            // If an error occurs, return a 500 error response
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    },
    sendMail: async (req, res, next) => {
        try {
             // Send email to the created email address
             const mailOptions = {
                from: {
                    name: "Kgothatso Theko",
                    address: "kgothatsotheko7@gmail.com"
                },
                to: req.body.email.toString(),
                subject: "New Account Created",
                text: "Account successfully created",
                html: "<b>Account successfully created</b>",
            };
            sendMail(mailOptions);

        } catch (error) {
            res.status(500).send(error)
        }
    }
    
}