const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    lastname: {
        required: false,
        type: String
    },
    nationality: {
        required: true,
        type: String
    },
    active:{
        required: true,
        type: Boolean
    }
}) 

module.exports = mongoose.model('DataPlayer', playerSchema)