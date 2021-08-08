const covidData = require('express').Router();
const auth = require('../middleware/auth');


// const { getUsers, getDateInfo, getStateInfo, getPinpointInfo } = require('./controller/index');

// covidData.get('/getUseGrs', auth, getUsers);

// covidData.post('/Get_Date_Info', auth, validate(validator.getDateInfo), getDateInfo)

// covidData.post('/Get_State_Info', auth, validate(validator.getStateInfo), getStateInfo);

// covidData.post('/Get_Pinpoint_Info', auth, validate(validator.getPinPointInfo), getPinpointInfo);

module.exports = covidData;