const mongoose = require('mongoose');

const covidCountSchema = new mongoose.Schema({
    Sno: { type: Number },
    Date: { type: String },
    Time: { type: String },
    "State/UnionTerritory": { type: String },
    ConfirmedIndianNational: { type: Number },
    ConfirmedForeignNational: { type: Number },
    Cured: { type: Number },
    Deaths: { type: Number },
    Confirmed: { type: Number },
});

module.exports = mongoose.model('covidIndia', covidCountSchema,'covidIndia');


