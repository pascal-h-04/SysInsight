const express = require('express');
const app = express();
const port = 3001;
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const { processFormData } = require('./AnalyseServer'); // Importiere die Auswertungsfunktion

app.use(cors({
  origin: 'http://localhost:3000', // Erlaube Anfragen von http://localhost:3000
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  credentials: true,
}));

app.use(bodyParser.json());

// Route zum Verarbeiten von Formulardaten
app.post('/api/submit', (req, res) => {
  const formData = req.body;
  const results = processFormData(formData);
  res.json(results); // Sende die verarbeiteten Ergebnisse zurück
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
  console.log("Hello World!");
});