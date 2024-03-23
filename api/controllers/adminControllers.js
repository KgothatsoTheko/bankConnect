const admin = require('../models/admin');
const File = require('../models/file');
const { Readable } = require("stream")
const mongoose = require("mongoose")
// hash the password
const bcrypt = require('bcrypt')

let bucket;
mongoose.connection.on("open", () => {
    console.log('ADMIN COONECTION RUNNING')
    bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db);
})

const pictureId = `picture-${new Date().getTime()}`;

module.exports = {
    defaultRoute: async (req, res) => {
        try {
            res.send('Welcome to My Backend');
        } catch (error) {
            res.status(500).send(error)
        }
    },
    addAdmin: async (req, res) => {
        try {
            const payload = { ...req.body };
            payload['fileId'] = pictureId;
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(req.body.password, salt)
            payload.password = hashPassword
            const newAdmin = new admin(payload)
            const result = await newAdmin.save()
            res.status(201).send(result)
        } catch (error) {
            res.status(500).send(error)
        }
    },
    uploadFile: async (req, res) => {
        const { files } = req;

        let { fieldname, originalname, mimetype, buffer } = files[0]
        let newFile = new File({
            filename: originalname,
            contentType: mimetype,
            length: buffer.length,
            fileId: pictureId,
        })

        try {
            const uploadStream = bucket.openUploadStream(fieldname)
            const readBuffer = new Readable();
            readBuffer.push(buffer)
            readBuffer.push(null)

            const isUploaded = await new Promise((resolve, reject) => {
                readBuffer.pipe(uploadStream)
                    .on("finish", resolve("successfull"))
                    .on("error", reject("error occured while creating stream"))
            })

            newFile.id = uploadStream.id
            const savingResults = await newFile.save();
            if (!savingResults) {
                res.status(404).send("error occured while saving our work")
            }
            res.send({ file: savingResults, message: "file uploaded successfully" })
        } catch (error) {
            console.log('error', error)
        }
    },
    getFile: (req, res) => {
        const { id } = req.params;
        let downloadStream = bucket.openDownloadStream(new mongoose.Types.ObjectId(id))
        downloadStream.on("file", (file) => {
            res.set("Content-Type", file.contentType)
        })
        downloadStream.pipe(res)
    },
    //Getting data from backend
    getAdmin: async (req, res) => {
        try {
            const result = await admin.find(req.params);
            res.status(200).send(result)
        } catch (error) {
            res.status(500).send(error);
        }
    },
    //Updating data to mongo
   
}