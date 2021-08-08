const config = require('./config/config.js');
const mongoose = require('mongoose');

const app = require('./index');

mongoose.Promise = global.Promise;

mongoose.connect(config.mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(`Successfully connected to ${config.mongoUrl}`);
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.listen(5000, (error) => {
    if (error) {
        console.log('Unable to listen for connections: ', error);
    }
    console.log(`Server started on port ${process.env.PORT}....`);
});
