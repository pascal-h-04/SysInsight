const express = require('express');
const app = express();
const port = 3001;
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');


require('dotenv').config();
const { processFormData } = require('./auswertung'); // Importiere die Auswertungsfunktion



app.use(cors({
  origin: 'http://localhost:3000', // Erlaube Anfragen von http://localhost:3000
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  credentials: true,
}));

app.use(bodyParser.json());


app.post('/api/submit', (req, res) => {
  const formData = req.body;
  //console.log('Server: Received form data:', formData); // Gibt die empfangenen Daten in der Konsole aus
  // Verarbeite die Formulardaten mit der Auswertungsfunktion
  const results = processFormData(formData);
  console.log('Server: Processed results:', results); // Gibt die verarbeiteten Daten in der Konsole aus

  res.json(results); // Sende die verarbeiteten Ergebnisse zurück
});

//Login Neu
// Beispiel: Datenbank-Simulation für Benutzer
const users = [
  { id: 1, username: 'user', password: 'password', isAdmin: false },
  { id: 2, username: 'admin', password: 'password', isAdmin: true },
];

// Middleware
app.use(cors());

// Login Route
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

// Simuliere die Authentifizierung gegen eine Datenbank
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    res.json({
      auth: true,
      isAdmin: user.isAdmin,
    });
  } else {
    res.json({ auth: false });
  }
});






//Ende Login neu



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
  console.log('Hello World');
});




