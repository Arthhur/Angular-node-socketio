const ftp = require('basic-ftp');
const mongoose = require('mongoose');
const Image = require('../models/image');

exports.get_all_images = async (req, res, next) => {
    Image.find()
        .exec()
        .then(images => {
            res.status(200).json({
                message: "Handling GET REquest /images",
                images: images
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
    
}

exports.post_image = (req, res, next) => {
    const image = new Image({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        img: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
    });
    image.save()
    .then(result =>  {
        res.status(201).json({
            message: "Handling POST REquest /images",
            created: image
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
}

exports.delete_image = (req, res, next) => {
    const id = req.params.imageId;
    Image.remove({
        _id: id
    })
    .exec()
    .then(result => {
        res.status(200).json({
            message: "Image deleted"
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
    
}

async function connectionFTP() {
    let imgName = [];
    const webServer = process.env.WEBSERVER;
    const client = new ftp.Client();
    client.ftp.verbose = true;
    try {
        await client.access({
            host: process.env.FTP_HOTE,
            user: process.env.FTP_USERNAME,
            password: process.env.FTP_PASSWORD,
            secure: false
        })
        const fileInfo = await client.list();
        for(file of fileInfo) {
            imgName.push(`${webServer}/${file.name}`);
        }
        console.log(imgName);
        //await client.uploadFrom("img-corona.jpg", "images/img-corona-ftp.jpg");
        //await client.downloadToDir("./angular-socketio/src/assets/images/", "images");
       /* fs.readdir(imgFolder, (err, files) => {
            files.forEach(file => {
              imgName.push(`assets/images/${file}`);
            });
        });*/
        return imgName;
    }
    catch(err) {
        console.log(err);
    }
    client.close();
}