const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const multer = require('multer');


    const storage = multer.memoryStorage();
    const upload = multer({ storage })
    
    // New Lead routes
    const leadController = require('../controllers/leadController');
    router.get('/', leadController.defaultRoute);
    router.post('/leads', leadController.addLead);
    // router.post('/upload', upload.any(), leadController.uploadFile);
    router.get('/get-lead', leadController.getLead)
    router.post('/update-lead/:leadName', leadController.updateLead)
    router.delete('/leads/:email', leadController.deleteLead)

    //new Admin routes
        // New Lead routes
        const adminController = require('../controllers/adminControllers');
        router.get('/', adminController.defaultRoute);
        router.post('/add-admin', adminController.addAdmin);
        router.get('/get-admin', adminController.getAdmin)

    // Add task routes
    const taskController = require('../controllers/taskController');
    router.get('/', taskController.defaultRoute);
    router.post('/tasks', taskController.addTask);
    router.get('/get-task', taskController.getTask);
    router.post('/update-task/:taskName', taskController.updateTask);
    router.delete('/delete-task/:taskName', taskController.deleteTask);

    // Customer routes
    const customerController = require('../controllers/customerController');
    router.get('/', customerController.defaultRoute);
    router.post('/customers', customerController.addCustomer);
    router.get('/get-customer', customerController.getCustomer)
    router.post('/update-customer/:email', customerController.updateCustomer)
    router.post('/update-customerbalance/:email', customerController.updateCustomerBalance)
    router.post('/withdraw-customerbalance/:email', customerController.withdrawCustomerBalance)
    router.delete('/delete-customer/:email', customerController.deleteCustomer)

    // Auth Routes
    const authController = require('../controllers/authController');
    // register
    router.post('/SignIn', authController.registerRoute)
    //  login
    router.post('/LogIn', authController.loginRoute)


    
    
    // Add Report routes
    const reportController = require('../controllers/reportController');
    router.get('/', reportController.defaultRoute);
    router.post('/reports', reportController.addReport);
    router.get('/get-report', reportController.getReport);

    // Add Transaction routes
    const transactionController = require('../controllers/transactionsController');
    router.get('/', transactionController.defaultRoute);
    router.post('/add-airtime', transactionController.addAirtime);
    router.get('/get-airtime', transactionController.getAirtime);
    router.post('/airtime-withdraw/:email', transactionController.withdrawAirtime)
    router.post('/add-electricity', transactionController.addElectricity);
    router.get('/get-electricity', transactionController.getElectricity);
    router.post('/electricity-withdraw/:email', transactionController.withdrawElectricity)
    router.post('/feedback', transactionController.addFeedback);
    router.get('/get-feedback', transactionController.getFeedback);

    // Send mail
    router.post('/send-mail', authController.sendMail)

module.exports = router;