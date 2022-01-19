const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
 
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/budget", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// app.set('public', __dirname + '/public')
// app.engine('html', require('ejs').renderFile);

// routes
app.get('/', (req, res) => {
    res.sendFile('index')
})

app.get('/exercise', (req, res) => {
  res.sendFile('public/exercise.html', { root: __dirname } )
})

app.get('/stats', (req, res) => {
  res.sendFile('public/stats.html', { root: __dirname } )
})

app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
