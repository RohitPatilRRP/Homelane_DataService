const mongoose = require('mongoose');

const vaccineCountSchema = new mongoose.Schema({
    'Updated On': { type: String },
    State: { type: String },
    'Total Doses Administered': { type: Number },
    'Total Sessions Conducted': { type: Number },
    'Total Sites ': { type: Number },
    'First Dose Administered': { type: Number },
    'Second Dose Administered': { type: Number },
    'Male(Individuals Vaccinated)': { type: Number },
    'Female(Individuals Vaccinated)': { type: Number },
    'Transgender(Individuals Vaccinated)': { type: Number },
    'Total Covaxin Administered': { type: Number },
    'Total CoviShield Administered': { type: Number },
    'Total Sputnik V Administered': { type: Number },
    'AEFI': { type: Number },
    '18-45 years (Age)': { type: Number },
    '45-60 years (Age)': { type: Number },
    '60+ years (Age)': { type: Number },
    'Total Individuals Vaccinated': { type: Number },
});

module.exports = mongoose.model('vaccine', vaccineCountSchema);

