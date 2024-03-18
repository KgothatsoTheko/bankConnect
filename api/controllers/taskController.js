const Task = require('../models/task');
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
    addTask: async (req, res) => {
        try {
            const payload = { ...req.body };
            const newTask = new Task(payload)
            const result = await newTask.save()
            console.log(req)
            res.status(201).send(result)
        } catch (error) {
            res.status(500).send(error)
        }
    },
    //Getting data from backend
    getTask: async (req, res) => {
        try {
            const result = await Task.find(req.params);
            res.status(200).send(result)
        } catch (error) {
            res.status(500).send(error);
        }
    },
    //Updating data to mongo
    updateTask: async (req, res) => {
        const options = { upsert: true };
        const filter = { ...req.params }
        try {
            const result = await Task.updateOne(filter, req.body, options);
            res.status(200).send(result)
        } catch (error) {
            res.status(500).send(error);
        }
    },
    //Updating data to mongo
    deleteTask: async (req, res) => {
        const query = { ...req.params }
        try {
            const result = await Task.deleteOne(query);
            res.status(200).send(result)
        } catch (error) {
            res.status(500).send(error);
        }
    },

}