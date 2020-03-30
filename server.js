require("dotenv").config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const ftp = require('basic-ftp');

const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
const img = ['https://urlz.fr/cf2z', 'https://urlz.fr/cf2E'];
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.on('my message', (msg) => {
        io.emit('images', img);
    });
});

async function connectionFTP() {
    const client = new ftp.Client();
    client.ftp.verbose = true;
    try {
        await client.access({
            host: "myftpserver.com",
            user: "very",
            password: "password",
            secure: true
        })
        console.log(await client.list());
        await client.uploadFrom("README.md", "README_FTP.md");
        await client.downloadTo("README_COPY.md", "README_FTP.md");
    }
    catch(err) {
        console.log(err);
    }
    client.close();
}

http.listen(port, () => {
    console.log(`listening on : ${port}`);
});