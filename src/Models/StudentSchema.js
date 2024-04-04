

//? Creating Student Schema :--

const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({

    email: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    }

})

const studentDetail = new mongoose.model("studentDetail", studentSchema);

module.exports = studentDetail;