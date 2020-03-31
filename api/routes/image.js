const express = require('express');
const router = express.Router();
const imageController = require('../controllers/image');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ) {
        cb(null, false);
    }
    else {
        cb(new Error('Only .jpeg or .png files are accepted'), true);
    }
};

const upload = multer({
    storage: storage
    /*limits: {
        fileSize: 1024 * 1024 * 5
    }
    fileFilter: fileFilter*/
});

router.get('/', imageController.get_all_images);

router.post('/', upload.single('image'), imageController.post_image);

router.delete('/:imageId', imageController.delete_image);

module.exports = router ;