const moment = require('moment');

const config = require('../../config/config');
const covidCount = require('../../model/dateInfo');
const stateTest = require('../../model/stateInfo');
const vaccines = require('../../model/vaccineInfo');

const getDateInfo = async (req, res) => {
    try {
        let { Date: date } = req.body;
        let updateDate = moment(new Date(date)).format('DD/MM/YYYY');
        const promiseArray = [
            covidCount.aggregate([
                {
                    $match: {
                        Date: date
                    }
                },
                {
                    $group: {
                        _id: "$State/UnionTerritory",
                        ConfirmedIndianNational: { $sum: "$ConfirmedIndianNational" },
                        ConfirmedForeignNational: { $sum: "$ConfirmedForeignNational" },
                        Deaths: { $sum: "$Deaths" },
                        Cured: { $sum: "$Cured" },
                        Confirmed: { $sum: "$Confirmed" }
                    }
                },
                {
                    $project: {
                        Date: 1,
                        State: 1,
                        ConfirmedIndianNational: 1,
                        ConfirmedForeignNational: 1,
                        Deaths: 1,
                        Cured: 1,
                        Confirmed: 1
                    }
                }
            ]),
            stateTest.aggregate([
                {
                    $match: {
                        Date: date
                    }
                },
                {
                    $group: {
                        _id: "$State",
                        TotalSamples: { $sum: "$TotalSamples" },
                        Negative: { $sum: "$Negative" },
                        Positive: { $sum: "$Positive" },
                    }
                },
                {
                    $project: {
                        State: 1,
                        Negative: 1,
                        Positive: 1,
                    }
                }
            ]),
            vaccines.aggregate([
                {
                    $match: {
                        'Updated On': updateDate
                    }
                },
                {
                    $group: {
                        _id: "$State",
                        'Total Doses Administered': { $sum: "$Total Doses Administered" },
                    }
                },
                {
                    $project: {
                        State: 1,
                        'Total Doses Administered': 1,
                    }
                }
            ])
        ];
        let result = await Promise.all(promiseArray);
        return res.status(200).send({
            code: 200,
            result: {
                covidStats: (result[0] && result[0].length) > 0 ? result[0] : [],
                stateWiseStats: (result[1] && result[1].length) > 0 ? result[1] : [],
                vaccineStats: (result[2] && result[2].length) > 0 ? result[2] : [],
            }
        });
    } catch (err) {
        return res.status(500).send(err);
    }
}

const getStateInfo = async (req, res) => {
    try {
        let { State_name: State } = req.body;
        const promiseArray = [
            covidCount.aggregate([
                {
                    $match: {
                        "State/UnionTerritory": State
                    }
                },
                {
                    $group: {
                        _id: "$State/UnionTerritory",
                        ConfirmedIndianNational: { $sum: "$ConfirmedIndianNational" },
                        ConfirmedForeignNational: { $sum: "$ConfirmedForeignNational" },
                        Deaths: { $sum: "$Deaths" },
                        Cured: { $sum: "$Cured" },
                        Confirmed: { $sum: "$Confirmed" }
                    }
                },
                {
                    $project: {
                        Date: 1,
                        State: 1,
                        ConfirmedIndianNational: 1,
                        ConfirmedForeignNational: 1,
                        Deaths: 1,
                        Cured: 1,
                        Confirmed: 1
                    }
                }
            ]),
            stateTest.aggregate([
                {
                    $match: {
                        State
                    }
                },
                {
                    $group: {
                        _id: "$State",
                        TotalSamples: { $sum: "$TotalSamples" },
                        Negative: { $sum: "$Negative" },
                        Positive: { $sum: "$Positive" },
                    }
                },
                {
                    $project: {
                        State: 1,
                        Negative: 1,
                        Positive: 1,
                    }
                }
            ]),
            vaccines.aggregate([
                {
                    $match: {
                        State
                    }
                },
                {
                    $group: {
                        _id: "$State",
                        'Total Doses Administered': { $sum: "$Total Doses Administered" },
                    }
                },
                {
                    $project: {
                        State: 1,
                        'Total Doses Administered': 1,
                    }
                }
            ])
        ];
        let result = await Promise.all(promiseArray);
        return res.status(200).send({
            code: 200,
            result: {
                covidStats: (result[0] && result[0].length) > 0 ? result[0] : [],
                stateWiseStats: (result[1] && result[1].length) > 0 ? result[1] : [],
                vaccineStats: (result[2] && result[2].length) > 0 ? result[2] : [],
            }
        });
    } catch (err) {
        return res.status(500).send(err);
    }
}

const getPinpointInfo = async (req, res) => {
    try {
        let { State_name: State, Date: date } = req.body;
        let updateDate = moment(new Date(date)).format('DD/MM/YYYY');
        const promiseArray = [
            covidCount.aggregate([
                {
                    $match: {
                        $and: [
                            { "State/UnionTerritory": State },
                            { Date: date }
                        ]
                    }
                },
                {
                    $group: {
                        _id: { "State": "$State/UnionTerritory", "Date": "$Date" },
                        ConfirmedIndianNational: { $sum: "$ConfirmedIndianNational" },
                        ConfirmedForeignNational: { $sum: "$ConfirmedForeignNational" },
                        Deaths: { $sum: "$Deaths" },
                        Cured: { $sum: "$Cured" },
                        Confirmed: { $sum: "$Confirmed" }
                    }
                },
                {
                    $project: {
                        Date: 1,
                        State: 1,
                        ConfirmedIndianNational: 1,
                        ConfirmedForeignNational: 1,
                        Deaths: 1,
                        Cured: 1,
                        Confirmed: 1
                    }
                }
            ]),
            stateTest.aggregate([
                {
                    $match: {
                        $and: [
                            { State },
                            { Date: date }
                        ]
                    }
                },
                {
                    $group: {
                        _id: { "State": "$State", "Date": "$Date" },
                        TotalSamples: { $sum: "$TotalSamples" },
                        Negative: { $sum: "$Negative" },
                        Positive: { $sum: "$Positive" },
                    }
                },
                {
                    $project: {
                        State: 1,
                        Date: 1,
                        Negative: 1,
                        Positive: 1,
                    }
                }
            ]),
            vaccines.aggregate([
                {
                    $match: {
                        $and: [
                            { State },
                            { 'Updated On': updateDate }
                        ]
                    }
                },
                {
                    $group: {
                        _id: { "State": "$State", "Date": "$Date" },
                        'Total Doses Administered': { $sum: "$Total Doses Administered" },
                    }
                },
                {
                    $project: {
                        State: 1,
                        'Updated On': 1,
                        'Total Doses Administered': 1,
                    }
                }
            ])
        ];
        let result = await Promise.all(promiseArray);
        return res.status(200).send({
            code: 200,
            result: {
                covidStats: (result[0] && result[0].length) > 0 ? result[0] : [],
                stateWiseStats: (result[1] && result[1].length) > 0 ? result[1] : [],
                vaccineStats: (result[2] && result[2].length) > 0 ? result[2] : [],
            }
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