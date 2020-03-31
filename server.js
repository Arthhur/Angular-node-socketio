require("dotenv").config();
const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`listening on : ${port}`);
});


/*---------- SOCKET -----------

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.on('ftp', async (msg) => {
        await connectionFTP();
    });

    socket.on('my message', (msg) => {
        io.emit('images', imgName);
    });
}); 


const imgFolder = './angular-socketio/src/assets/images';

const http = require('http').Server(app);
const io = require('socket.io')(http);

*/