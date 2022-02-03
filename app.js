const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');
const bodyParser = require('body-parser'); // parses the body to json
app.use(bodyParser.json());

// Import Routes
const duckRoutes = require('./routes/duck');
app.use('/duck', duckRoutes);
const clothingRoutes = require('./routes/clothing');
app.use('/clothingItem', clothingRoutes);
const transactionRoutes = require('./routes/transaction');
app.use('/', transactionRoutes);

// Routes
// app.get('/', (req, res) => {
//     res.send('Hello world!');
// })

// connect to db
mongoose.connect(process.env.DB_URL, () => {
    console.log('successfully connected to db!');
});

// listen to the server
app.listen(3000);