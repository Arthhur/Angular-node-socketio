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
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' ) {
        cb(null,true);
    }
    else {
        cb(new Error('Only .jpeg or .png files are accepted'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
});

router.get('/', imageController.get_all_images);

router.post('/', upload.single('image'), imageController.post_image);

router.delete('/:imageId', imageController.delete_image);

module.exports = router ;