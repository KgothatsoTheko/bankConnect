const Airtimes = require('../models/airtime');
const Electricities = require('../models/electricity');
const Feedback = require('../models/feedback');
const mongoose = require("mongoose")


module.exports = {
    defaultRoute: async (req, res) => {
        try {
            res.send('Welcome to My Backend');
        } catch (error) {
            res.status(500).send(error)
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
}