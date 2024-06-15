const express = require('express');
const app = express();
const port = 3001;

app.get('/api', (req, res) => {
  res.send('Hello from the Node.js server!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
  console.log(`Hello World`);
});



const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();


const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  methods: ["GET", "POST", "DELETE", "PUT"],
  credentials: true,
}));

app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Für Produktionsumgebungen auf true setzen
}));

app.use('/api', require('./routes/authRoutes'));