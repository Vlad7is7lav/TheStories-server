const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bCrypt = require('bcrypt');
const coockieParser = require('cookie-parser');
// const { config } = require('dotenv/types');
const config = require('./config/config').get(process.env.NODE_ENV);

const { User } = require('./models/user');
const userRoute = require('./routes/userRoutes');
const storyRoute = require('./routes/storyRoutes')

const app = express();

//MIDDLEWARE
app.use(express.json());
app.use(coockieParser());
app.use('/api/user', userRoute);
app.use('/api/stories', storyRoute);
app.use(express.static('client/build'))

if(process.env.NODE_ENV === 'production') {
    const path = require('path');
    app.get('/*',  (req, res)=> {
        console.log('Works');
        res.sendFile(path.resolve(__dirname, '..client/build', 'index.html' ))
    })
}

// mongoose.connect(config.DATABASE, {
mongoose.connect(config.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})

mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server is started in port: ${port}`);
})