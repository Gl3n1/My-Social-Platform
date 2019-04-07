const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport')

const users = require('./routes/api/users');
const profiles = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

//body parser middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//DB Config

const db = require('./config/keys').mongoURI;

//connect to DB

mongoose
  .connect(db)
  .then(()=> console.log("you're connect to the DB"))
  .catch(err => console.log(`oh no, error connecting to DB !`))

//passport middleware
app.use(passport.initialize())

//passport config
require('./config/passport')(passport)

//use routes 
app.use('/api/users', users)
app.use('/api/profile', profiles)
app.use('/api/posts', posts)

const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log(`Server running on port ${port}`));