const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const StakeRoute = require('./routes/stakes');

const app = express();
// enabling CORS for some specific origins only. 
let corsOptions = { 
    origin : [process.env.CORS_ORIGIN], 
};
 
app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/stake', StakeRoute);

const url = process.env.MONGODB_URL;
mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;

try {
    con.on('open', () => {
        console.log('Connected to the database');
    })
} catch (error) {
    console.log("Error: " + error);
}

const port = 9000;
app.listen(port, () => {
    console.log('Server started on port ' + port);
});
