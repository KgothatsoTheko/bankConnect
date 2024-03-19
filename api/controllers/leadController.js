const Lead = require('../models/lead');
const File = require('../models/file');
const { Readable } = require("stream")
const mongoose = require("mongoose")

let bucket;
mongoose.connection.on("open", () => {
    console.log('LEAD COONECTION RUNNING')
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
    addLead: async (req, res) => {
        try {
            const payload = { ...req.body };
            payload['fileId'] = pictureId;
            const newLead = new Lead(payload)
            const result = await newLead.save()
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
    getLead: async (req, res) => {
        try {
            const result = await Lead.find(req.params);
            res.status(200).send(result)
        } catch (error) {
            res.status(500).send(error);
        }
    },
    //Updating data to mongo
    updateLead: async (req, res) => {
        try {
          const leadName = req.params.leadName;
          console.log('Updating lead:', leadName);
          const updatedLeadData = req.body;
          console.log('New lead data:', updatedLeadData);
          const updatedLead = await Lead.findOneAndUpdate({ name: leadName }, updatedLeadData, { new: true });
          console.log('Updated lead:', updatedLead);
          if (!updatedLead) {
            return res.status(404).json({ message: 'Lead not found' });
          }
          res.status(200).json(updatedLead);
        } catch (error) {
          console.error('Error updating lead:', error);
          res.status(500).json({ message: 'Internal server error' });
        }
      },
    //Updating data to mongo
    deleteLead: async (req, res) => {
        const query = { ...req.params }
        try {
            const result = await Lead.deleteOne(query);
            res.status(200).send(result)
        } catch (error) {
            res.status(500).send(error);
        }
    },
}