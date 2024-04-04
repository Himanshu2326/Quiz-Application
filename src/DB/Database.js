

//? Connecting Database:--

require('dotenv').config();
const mongoose = require('mongoose');
const AtlasDb = process.env.ATLASDB;

// mongoose.connect('mongodb://127.0.0.1:27017/Quizeeee')
mongoose.connect(AtlasDb)
    .then(() => console.log('Database Connect'))
    .catch((e) => console.log('Error in Connecting Database'))


