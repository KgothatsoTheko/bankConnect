const Airtimes = require('../models/airtime');
const Electricities = require('../models/electricity');
const Feedback = require('../models/feedback');
const Customer = require('../models/customer');
const mongoose = require("mongoose")


module.exports = {
    defaultRoute: async (req, res) => {
        try {
            res.send('Welcome to My Backend');
        } catch (error) {
            res.status(500).send(error)
        }
    },
    //Updating data to mongo
    withdrawCustomerBalance: async (req, res) => {
        const options = { upsert: true };
        const filter = { ...req.params }
        try {
            const result = await Customer.updateOne(filter, req.body, options);
            res.status(200).send(result)
        } catch (error) {
            res.status(500).send(error);
        }
    },
    addAirtime: async (req, res) => {
        try {
            const payload = { ...req.body };
            const newAirtime = new Airtimes(payload)
            const result = await newAirtime.save()
            res.status(201).send(result)
        } catch (error) {
            res.status(500).send(error)
        }
    },
    getAirtime: async (req, res) => {
        try {
            const result = await Airtimes.find(req.params);
            res.status(200).send(result)
        } catch (error) {
            res.status(500).send(error);
        }
    },
    //Updating data to mongo
    withdrawAirtime: async (req, res) => {
        const email = req.params.email;
        const airtimeAmount = req.body.airtimeAmount; // assuming you send airtimeAmount from Angular
    
        try {
            const customer = await Customer.findOne({ email });
            if (!customer) {
                return res.status(404).send("Customer not found");
            }
    
            // Update balance by adding airtimeAmount
            customer.balance -= airtimeAmount;
            await customer.save();
    
            res.status(200).send(customer); // Return updated customer object if needed
        } catch (error) {
            res.status(500).send(error);
        }
    },
    addElectricity: async (req, res) => {
        try {
            const payload = { ...req.body };
            const newElectricity = new Electricities(payload)
            const result = await newElectricity.save()
            res.status(201).send(result)
        } catch (error) {
            res.status(500).send(error)
        }
    },
    getElectricity: async (req, res) => {
        try {
            const result = await Electricities.find(req.params);
            res.status(200).send(result)
        } catch (error) {
            res.status(500).send(error);
        }
    },
    withdrawElectricity: async (req, res) => {
        const email = req.params.email;
        const electricityAmount = req.body.electricityAmount; // assuming you send electricityAmount from Angular
    
        try {
            const customer = await Customer.findOne({ email });
            if (!customer) {
                return res.status(404).send("Customer not found");
            }
    
            // Update balance by adding electricityAmount
            customer.balance -= electricityAmount;
            await customer.save();
    
            res.status(200).send(customer); // Return updated customer object if needed
        } catch (error) {
            res.status(500).send(error);
        }
    },
    addFeedback: async (req, res) => {
        try {
            const payload = { ...req.body };
            const newFeedback = new Feedback(payload)
            const result = await newFeedback.save()
            res.status(201).send(result)
        } catch (error) {
            res.status(500).send(error)
        }
    },
    getFeedback: async (req, res) => {
        try {
            const result = await Feedback.find(req.params);
            res.status(200).send(result)
        } catch (error) {
            res.status(500).send(error);
        }
    },
}