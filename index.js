const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config()
const cors = require('cors')
const app = express()
const authController = require('./controllers/authController')
const Room = require('./models/room')
mongoose.connect('mongodb+srv://RoyRu:RrMDB260700@cluster0.is0prtq.mongodb.net/?retryWrites=true&w=majority', {})
    .then(() => console.log('Connected Successfully')).catch(err => { console.log('There Was An Error'); console.log(err) })
app.use(bodyParser.json())
app.use(cors())
app.listen(8000, () => console.log('Listening to port 8000'))
app.post('/register', authController.register)
app.post('/login', authController.login)
app.post('/addMessage', authController.addMessage)
app.post('/getIdByEmail', authController.getIdByEmail)
app.post('/getNameById', authController.getNameById)
app.post('/createRoom', authController.createRoom)
app.post('/getUserRooms', authController.getUserRooms)
app.post('/getRoomMsg', authController.getRoomMsg)
const io = require('socket.io')(2000, {
    cors: {
        origin: ['http://localhost:3000']
    }
});
io.on('connection', (socket) => {
    socket.on('join-room', (room) => {
        socket.join(room)
    })
    socket.on('send-message', (msg) => {
        console.log(msg)
        if (msg.room === '') {
            socket.broadcast.emit('recieve-message', msg)
        }
        else {
            socket.to(msg.room).emit('recieve-message', msg)
        }
    })
})
