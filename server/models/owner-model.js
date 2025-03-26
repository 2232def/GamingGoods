const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/database");

const ownerSchema = mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    products: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
    }],
    gstin: String,
});

module.exports = mongoose.model('owner', ownerSchema);  
