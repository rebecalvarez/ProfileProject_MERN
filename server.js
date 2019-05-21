// Backend framework
const express = require('express');
// ORM to interact with MongoDB
const mongoose = require('mongoose');
// Express middleware module to extract the body of an incoming request (req.body)
const bodyParser = require('body-parser');
// Router
const profiles = require('./routes/api/profiles');
// Core node module to handle file paths
const path = require('path');

// Initialize express
const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/profiles', profiles);

// DB
const db = require('./config/keys').mongoURI;

// Connect to Mongo
// mongoose.connect(db, { useNewUrlParser: true })
//     // Success Message/Callback
//     .then(() => console.log("MongoDB Connected..."))
//     // Error Message/Callback
//     .catch(err => console.log(err));

// Connect to the Mongo DB
mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/profiledb',
    () => {
      console.log('Connected to mongodb');
    }
  );


// Serve static assets (build folder) if production
if(process.env.NODE_ENV === 'production') {
    // Set a static folder
    app.use(express.static('client/build'));

    // Any requests that's not api/profiles load index.html
    app.get('*', (req, res) => {
        res.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// Port used to connect to Heroku
const PORT = process.env.PORT || 5000;

// Listen to the Heroku port and display message/Callback
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

app.on('listening', function () {
    console.log('ok, server is running');
  });
  // Start the API server
  app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  });
  