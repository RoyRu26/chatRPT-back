const mongoose = require('mongoose')
const chatSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    sender: {
        type: String,
        required: true,
    },
    room: {type:mongoose.Types.ObjectId ,  ref:'Room'}
})
module.exports = mongoose.model('Chat', chatSchema)