const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    country: {
        required: true,
        type: String
    },
    ground: {
        required: true,
        type: String
    },
    yearfounded:{
        required: false,
        type: Number
    }
}) 

module.exports = mongoose.model('DataTeam', teamSchema)