const covidData = require('express').Router();

const { getUsers, getDateInfo, getStateInfo, getPinpointInfo } = require('./controller/index');

covidData.get('/getUsers',  getUsers);

covidData.post('/Get_Date_Info', getDateInfo)

covidData.post('/Get_State_Info', getStateInfo);

covidData.post('/Get_Pinpoint_Info', getPinpointInfo);

module.exports = covidData;