const express = require('express');
const mongoose = require('mongoose');

const app = express();

//DB Config

const db = require('./config/keys').mongoURI;

//connect to DB

mongoose
  .connect(db)
  .then(()=> console.log("you're connect to the DB"))
  .catch(err => console.log(`oh no, error!`))


app.get('/', (req,res)=> res.send('Hello World'));

const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log(`Server running on port ${port}`));