const mongoose = require('mongoose')
const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    users: [{type: mongoose.Types.ObjectId , ref: 'User'}],
    // manager: [{type: mongoose.Types.ObjectId, ref: 'User'}]
    messages: [{type: mongoose.Types.ObjectId, ref: 'Chat'}]
})
module.exports = mongoose.model('Room', roomSchema)