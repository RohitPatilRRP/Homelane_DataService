const express = require('express');
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const config = require('./config/config.js')
const router = require('./apis');
const User = require('./model/user.model');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.json({ "message": "Welcome to HomeLand query service" });
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { user_id: user._id, email },
                config.tokenKey,
                {
                    expiresIn: "2h",
                }
            );
            user.token = token;
            return res.status(200).json(user);
        }
        return res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }
});

app.use('/covidData/query', router);

app.listen(process.env.PORT || 5000);

module.exports = app;
