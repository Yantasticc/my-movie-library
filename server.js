if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

const app = express();
const indexRouter = require('./routes/index');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));

mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log('Connected to Mongoose');
    })
    .catch((error) => {
        console.error('Error connecting to Mongoose:', error);
    });

const db = mongoose.connection; 
db.on('error', (error) => {
    console.error(error);
});

app.use('/', indexRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port ' + (process.env.PORT || 3000));
});
