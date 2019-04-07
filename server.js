const express = require('express');
const mongoose = require('mongoose');

const app = express();

const users = require('./routes/api/posts');
const profiles = require('./routes/api/profile');
const posts = require('./routes/api/posts');

//DB Config

const db = require('./config/keys').mongoURI;

//connect to DB

mongoose
  .connect(db)
  .then(()=> console.log("you're connect to the DB"))
  .catch(err => console.log(`oh no, error connecting to DB !`))


app.get('/', (req,res)=> res.send('Hello World'));

//use routes 
app.use('/api/users', users)
app.use('/api/profile', profiles)
app.use('/api/posts', posts)

const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log(`Server running on port ${port}`));