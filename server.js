const express = require('express');
const dotenv= require('dotenv'); // allows us to seprate ur secret/credential from source code. this is usefull when we want to work in collabrating environment and when we need to share our code with other people. so instead of sharing credential , we can share sorce code while allowing other people to creat their own dot.env file.
const morgan = require('morgan');  // log a request on the console whenever we make request (request like get, post etc)
const bodyParser=require('body-parser');
const path = require('path');

const connectDB = require('./server/database/connection');
const app = express();

dotenv.config({path:"config.env"})
const PORT = process.env.PORT || 8000;

// log requests
morgan('tiny');

// mongoDB connection
connectDB();

// parse request to body-parser
app.use(bodyParser.urlencoded({extended:true}));

// set view engine
app.set('view engine', 'ejs');
// app.set('views',path.resolve(__dirname,'views/ejs'));

// load assets : using middleware method
app.use('/css', express.static(path.resolve(__dirname,"assets/css")));
app.use('/img', express.static(path.resolve(__dirname,"assets/img")));
app.use('/js', express.static(path.resolve(__dirname,"assets/js")));

// load routers
app.use('/',require('./server/routes/router'));

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});