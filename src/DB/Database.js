

//? Connecting Database:--

const mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:27017/Quizeeee')
mongoose.connect('mongodb+srv://Himanshu:Him23112003@cluster0.cc7jssc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('Database Connect'))
    .catch((e) => console.log('Error in Connecting Database'))


