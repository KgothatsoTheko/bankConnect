const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const multer = require('multer');


    const storage = multer.memoryStorage();
    const upload = multer({ storage })
    
    // new Lead routes
    const leadController = require('../controllers/leadController');
    router.get('/', leadController.defaultRoute);
    router.post('/leads', leadController.addLead);
    router.post('/upload', upload.any(), leadController.uploadFile);
    router.get('/get-lead', leadController.getLead)
    router.post('/update-lead/:email', leadController.updateLead)
    router.delete('/delete-lead/:email', leadController.deleteLead)

    // Add task routes
    const taskController = require('../controllers/taskController');
    router.get('/', taskController.defaultRoute);
    router.post('/tasks', taskController.addTask);
    router.get('/get-task', taskController.getTask);
    router.post('/update-task/:taskName', taskController.updateTask);
    router.delete('/delete-task/:taskName', taskController.deleteTask);

    // Add Report routes
    const reportController = require('../controllers/reportController');
    router.get('/', reportController.defaultRoute);
    router.post('/reports', reportController.addReport);
    router.get('/get-report', reportController.getReport);

module.exports = router;