

const mongoose = require('mongoose');

const quizResultSchema = mongoose.Schema({

    name: {
        reqired: true,
        type: String
    },
    email: {
        reqired: true,
        type: String
    },
    quizName: {
        reqired: true,
        type: String
    },
    score: {
        reqired: true,
        type: Number
    }

})

const quizSchema = mongoose.model('quizSchema', quizResultSchema);

module.exports = quizSchema;