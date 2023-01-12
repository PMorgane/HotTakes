const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require("path");

require('dotenv').config();
const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauces');
const rateLimit = require("./middleware/rateLimit");
const helmet = require('helmet');


const app = express();

mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB_URL)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((err) => console.log(err, 'Connexion à MongoDB échouée !'));


//app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

app.use(rateLimit);
app.use(helmet({crossOriginResourcePolicy: false,}));

app.use('/api/auth', userRoutes);
app.use('/api/sauces', saucesRoutes);
app.use('/images', express.static(path.join(__dirname, '/images')));
module.exports = app;
