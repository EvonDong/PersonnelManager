let express = require('express')
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
const cors = require('cors');

// Initialize the app
let app = express()

// Import routes
let apiRoutes = require('./api-routes');

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
 }));

 app.use(bodyParser.json());
 app.use(cors());

 // Connect to Mongoose and set connection variable
mongoose.connect('mongodb://localhost/personnelmanager', { useUnifiedTopology: true, useNewUrlParser: true});
var db = mongoose.connection;

// Added check for DB connection
if(!db)
    console.log("Error connecting db")
else
    console.log("Database connected successfully")

// Setup server port
var port = process.env.port || 5000;

// Send message for default URL
app.get('/', (req, res) => {
    res.send("This is the backend created using express");
})

// Use Api routes in the App
app.use('/api', apiRoutes);

// Handle production
if(process.env.NODE_ENV === "production") {            // true when deploy to heroku
    app.use(express.static(__dirname + '/public'));

    // Handle SPA(Single Page Application)
    app.get(/.*/, (res, req) => res.sendFile(__dirname, 'public/index.html'));                       // refer to any route
}


// Launch app to listen to specified port
const server = app.listen(port, function() {
    console.log("Running Personnel Manager on port " + port);
})

module.exports = server;




