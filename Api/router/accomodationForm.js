const { Router } = require('express');
const download = require('image-downloader');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const Accomodation = require('../models/Accomodation')


const router = Router();
const photosMiddleware = multer({ dest: 'uploads' })

router.post('/image-upload', async (req, res) => {
    const { url, id } = req.body;
    const imagesDir = path.join(__dirname, `../uploads/${id}`);
    const date = Date.now();
    const filename = path.join(imagesDir, `${date}.jpg`);
    const options = {
        url: url,
        dest: filename
    }
    try {
        if (!fs.existsSync(imagesDir)) {
            fs.mkdirSync(imagesDir, { recursive: true });
        }
        await download.image(options);
        res.json(`${id}/${date}.jpg`);
    } catch (err) {
        res.json({ error: err });
    }
})

router.post('/upload', photosMiddleware.array('photos', 100), async (req, res) => {
    const id = req.body.id;
    const uploadDir = path.join(__dirname, '../uploads', id);
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }
    let uploadedFiles = [];
    try {
        for (let i = 0; i < req.files.length; i++) {
            const { path: tempPath, originalname, filename } = req.files[i];
            const parts = originalname.split('.');
            const ext = parts[parts.length - 1];
            const newPath = path.join(uploadDir, filename + '.' + ext);
            fs.renameSync(tempPath, newPath);
            uploadedFiles.push(id + '/' + filename + '.' + ext);
        }
        res.json(uploadedFiles);
    } catch (err) {
        res.json({ error: err });
    }
})


router.get('/accomodation', async (req, res) => {
    try {
        const data = await Accomodation.find();
        res.json(data);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.post('/accomodation', async (req, res) => {
    const {
        owner,
        title,
        location,
        landmark,
        description,
        photos,
        amenities,
        extraInfo,
        checkIn,
        checkOut,
        members
    } = req.body;

    try {
        const accomodation = new Accomodation({
            owner,
            title,
            location,
            landmark,
            description,
            photos,
            amenities,
            extraInfo,
            checkIn,
            checkOut,
            members
        });
        await accomodation.save();
        res.json({ message: "Accomodation added" });
    } catch (err) {
        res.json({ error: err });
    }

})

router.get('/accomodation/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const data = await Accomodation.findById(id);
        res.json(data);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.put('/accomodation/:id', async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    try {
        if (!id) {
            return res.status(400).json({ error: "Id not provided" });
        }
        const data = await Accomodation.findById(id);
        console.log(data);
        if (!data) {
            return res.status(404).json({ error: "Accomodation not found" });
        }
        const updatedAccomodation = await Accomodation.findByIdAndUpdate(id, updateData, { new: true });
        res.json(updatedAccomodation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;