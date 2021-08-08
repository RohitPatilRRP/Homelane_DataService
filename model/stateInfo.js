const mongoose = require('mongoose');

const stateCountSchema = new mongoose.Schema({
    Date: { type: String },
    State: { type: String },
    TotalSamples: { type: Number },
    Negative: { type: Number },
    Positive: { type: Number },
});

module.exports = mongoose.model('statewiseTest', stateCountSchema);


