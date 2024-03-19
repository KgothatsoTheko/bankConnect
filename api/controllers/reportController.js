const Report = require('../models/reports')
const mongoose = require("mongoose")

let bucket;
mongoose.connection.on("open", () => {
    console.log('REPORT COONECTION RUNNING')
    bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db);
})

module.exports = {
    defaultRoute: async (req, res) => {
        try {
            res.send('Welcome to My Backend');
        } catch (error) {
            res.status(500).send(error)
        }
    } ,
    //Getting Report data from backend
    getReport: async (req, res) => {
        try {
            const result = await Report.find(req.params);
            res.status(200).send(result)
        } catch (error) {
            res.status(500).send(error);
        }
    },
    addReport: async (req, res) => {
        try {
            const payload = { ...req.body };
            const newReport = new Report(payload)
            const result = await newReport.save()
            console.log(result)
            res.status(201).send(result)
        } catch (error) {
            res.status(500).send(error)
        }
    }
}