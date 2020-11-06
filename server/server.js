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
app.use(bodyParser.json());
app.use(coockieParser());
app.use('/api/user', userRoute)
app.use('/api/stories', storyRoute)


mongoose.connect(config.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);



const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Servr is started in port: ${port}`);
})