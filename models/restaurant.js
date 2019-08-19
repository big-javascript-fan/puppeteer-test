const mongoose = require('mongoose');

const RestuarantSchema = mongoose.Schema({
    name: {
        type: String,
        default: '',
    },
    phone: {
        type: String,
        default: '',
    },
    address: {
        type: String,
        default: '',
    },
    reviews: {
        type: String,
        default: '',
    },
    description: {
        type: String,
        default: ''
    },
    group: {
        type: String,
        default: ''
    },
    space: {
        type: String,
        default: ''
    },
    html: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('Restuarant', RestuarantSchema);