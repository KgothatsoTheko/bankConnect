const Customer = require('../models/customer');
const mongoose = require("mongoose")

let bucket;
mongoose.connection.on("open", () => {
    console.log('TASK COONECTION RUNNING')
    bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db);
})

module.exports = {
    defaultRoute: async (req, res) => {
        try {
            res.send('Welcome to My Backend');
        } catch (error) {
            res.status(500).send(error)
        }
    },
    addCustomer: async (req, res) => {
        try {
            const payload = { ...req.body };
            const newCustomer = new Customer(payload)
            const result = await newCustomer.save()
            res.status(201).send(result)
        } catch (error) {
            res.status(500).send(error)
        }
    },
    //Getting data from backend
    getCustomer: async (req, res) => {
        try {
            const result = await Customer.find(req.params);
            res.status(200).send(result)
        } catch (error) {
            res.status(500).send(error);
        }
    },
    //Updating data to mongo
    updateCustomer: async (req, res) => {
        const options = { upsert: true };
        const filter = { ...req.params }
        try {
            const result = await Customer.updateOne(filter, req.body, options);
            res.status(200).send(result)
        } catch (error) {
            res.status(500).send(error);
        }
    },
    //Updating data to mongo
    updateCustomerBalance: async (req, res) => {
        const email = req.params.email;
        const depositAmount = req.body.depositAmount; // assuming you send depositAmount from Angular
    
        try {
            const customer = await Customer.findOne({ email });
            if (!customer) {
                return res.status(404).send("Customer not found");
            }
    
            // Update balance by adding depositAmount
            customer.balance += depositAmount;
            await customer.save();
    
            res.status(200).send(customer); // Return updated customer object if needed
        } catch (error) {
            res.status(500).send(error);
        }
    },
    //Updating data to mongo
    withdrawCustomerBalance: async (req, res) => {
        const email = req.params.email;
        const withdrawAmount = req.body.withdrawAmount; // assuming you send withdrawAmount from Angular
    
        try {
            const customer = await Customer.findOne({ email });
            if (!customer) {
                return res.status(404).send("Customer not found");
            }
    
            // Update balance by adding withdrawAmount
            customer.balance -= withdrawAmount;
            await customer.save();
    
            res.status(200).send(customer); // Return updated customer object if needed
        } catch (error) {
            res.status(500).send(error);
        }
    },
    //Updating data to mongo
    deleteCustomer: async (req, res) => {
        const query = { ...req.params }
        try {
            const result = await Customer.deleteOne(query);
            res.status(200).send(result)
        } catch (error) {
            res.status(500).send(error);
        }
    },
}