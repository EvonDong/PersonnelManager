// Import express
let express = require('express')
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
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
mongoose.connect('mongodb://localhost/resthub', { useNewUrlParser: true});
var db = mongoose.connection;

// Added check for DB connection
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

// Setup server port
var port = process.env.port || 5000;

// Send message for default URL
app.get('/', (req, res) => {
    res.send("Helloooo world created with expressss");
})

// Use Api routes in the App
app.use('/api', apiRoutes);

// Launch app to listen to specified port
app.listen(port, function() {
    console.log("Running REST hub on port " + port);
})






