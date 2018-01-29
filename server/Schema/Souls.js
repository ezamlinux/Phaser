const mongoose = require('mongoose');

var Souls = new mongoose.Schema({
    coins: Number,
    score: Number
}, {
    collection : 'samourai'
});

module.exports = mongoose.model('Souls', Souls);