const { Router } = require('express');
const download = require('image-downloader');
const fs = require('fs');
const path = require('path');
const multer = require('multer');


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


module.exports = router;