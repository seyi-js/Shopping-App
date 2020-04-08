const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//This File path/location must be same every where posted
const path = require( 'path' );
var session = require("express-session");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo')(session)
const PORT = process.env.PORT || 5000;
mongoose.set('useCreateIndex', true);
// const db = require('./Config/keys').mongoURI;
const db = process.env.MONGO__URL;
const items = require('./Routes/api/Items');
const User = require('./Routes/api/User');

//Process .env config
dotenv.config();
//Connect to MongoDB
mongoose.connect(db,{ useNewUrlParser: true,useUnifiedTopology: true })
.then(()=>{
    console.log('MongoDb Connected')
})
.catch( err=> console.log(err));
const dbo = mongoose.connection;

//Cookie Parser
app.use(cookieParser());

//BODY PARSER CONFIG
app.use(bodyParser.json());
//Express Session
app.use(session({
    name: process.env.SESSION_NAME,
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({
        mongooseConnection: dbo
    }),//Saves the Session to DataBase
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,//Expires in 24hours
        originalMaxAge: 1000 * 60 * 60 * 24,//Expires in 24hours
        
    }
})
);




//ROUTES
app.use('/api/items', items);
app.use('/api/user', User);


//Catch all other route

app.get("*", (req, res) => {
    res.send("<h1>error 404 Page not Found</h1>");
});


app.listen(PORT, console.log(`Server started on port ${PORT}`));
