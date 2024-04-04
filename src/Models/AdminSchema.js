

//? Creating Admin Schema :--

const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({

    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    }

})

const adminLoginDetail = new mongoose.model("adminLoginDetail", AdminSchema);

module.exports = adminLoginDetail;