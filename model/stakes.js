const mongoose = require('mongoose');

const stakeSchema = mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    index: {
        type: Number,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    staked_on: {
        type: Number,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    apy: {
        type: Number,
        required: true,
    },
    rewards: {
        type: Number,
        required: true,
    },
    trx_hash: {
        type: String,
        required: true,
    },
    removed: {
        type: Boolean,
        required: true,
        default: false
    },
    registered_on: {
        type: Date,
        default: new Date(),
    },
});

var stakeData = mongoose.model('stakes', stakeSchema);
module.exports = stakeData;