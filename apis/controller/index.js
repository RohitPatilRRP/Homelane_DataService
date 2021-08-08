const config = require('../../config/config');
const covidCount = require('../../model/dateInfo');
const stateTest = require('../../model/stateInfo');
const vaccines = require('../../model/vaccineInfo');

const getDateInfo = async (req, res) => {
    try {
        let result = await fetch(config.getDateInfoUrl, {
            method: 'post',
            body: JSON.stringify(req.body),
            headers: { 'Content-Type': 'application/json' },
        });
        resutl = await result.json();
        return res.status(200).send({
            code: 200,
            result
        });
    } catch (err) {
        return res.status(500).send(err);
    }
}

const getStateInfo = async (req, res) => {
    try {
        let result = await fetch(config.getStateInfoUrl, {
            method: 'post',
            body: JSON.stringify(req.body),
            headers: { 'Content-Type': 'application/json' },
        });
        resutl = await result.json();
        return res.status(200).send({
            code: 200,
            result
        });
    } catch (err) {
        return res.status(500).send(err);
    }
}

const getPinpointInfo = async (req, res) => {
    try {
        let result = await fetch(config.getPinpointInfoUrl, {
            method: 'post',
            body: JSON.stringify(req.body),
            headers: { 'Content-Type': 'application/json' },
        });
        resutl = await result.json();
        return res.status(200).send({
            code: 200,
            result
        });
    } catch (err) {
        return res.status(500).send(err);
    }
}

const getUsers = async (req, res) => {
    try {
        const result = await User.find({});
        console.log(res);
        return res.status(200).send({
            code: 200,
            result
        });
    } catch (err) {
        return res.status(500).send(err);
    }
}

module.exports = {
    getUsers,
    getDateInfo,
    getStateInfo,
    getPinpointInfo
}