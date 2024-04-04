

//? Creating Quiz Schema :- 

const mongoose = require('mongoose');


//* Options :-- 
const optionSchema = new mongoose.Schema({

    option: {
        required: true,
        type: String
    },
    isCorrect: {
        required: true,
        type: Boolean,
    }
   
});


//* Question :-- 
const questionSchema = new mongoose.Schema({

    question: {
        required: true,
        type: String
    },
    options: [optionSchema]

});


//* Quiz Schema :--
const quizSchema = new mongoose.Schema({

    title: {
        required: true,
        type: String
    },
    adminEmail: {
        required: true,
        type: String
    },
    adminName: {
        required: true,
        type: String
    },
    questions: [questionSchema]


})


const QuizDetail = mongoose.model("QuizDetail", quizSchema);
module.exports = QuizDetail;