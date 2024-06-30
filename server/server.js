const express = require('express');
const app = express();
const port = 3001;
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const { processFormData } = require('./auswertung_server'); // Importiere die Auswertungsfunktion

app.use(cors({
  origin: 'http://localhost:3000', // Erlaube Anfragen von http://localhost:3000
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  credentials: true,
}));

app.use(bodyParser.json());

// Beispiel: Datenbank-Simulation für Benutzer
const users = [
  { id: 1, username: 'user', password: 'password', isAdmin: false },
  { id: 2, username: 'admin', password: 'password', isAdmin: true},

];

// Route zum Verarbeiten von Formulardaten
app.post('/api/submit', (req, res) => {
  const formData = req.body;
  const results = processFormData(formData);
  res.json(results); // Sende die verarbeiteten Ergebnisse zurück
});


// Adminmanagement
// Endpoint to get user role by username
app.get('/api/user/:username', (req, res) => {
  const { username } = req.params;
  const user = users.find(user => user.username === username);

  if (user) {
    res.json({ role: user.isAdmin ? 'admin' : 'user' });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Endpoint to promote user to admin by username
app.post('/api/user/:username/promote', (req, res) => {
  const username = req.params.username;
  const user = users.find(u => u.username === username);
  if (user) {
    user.isAdmin = true;
    res.json({ message: 'User promoted to admin' });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Endpoint to remove admin rights from user by username
app.post('/api/user/:username/remove', (req, res) => {
  const username = req.params.username;
  const user = users.find(u => u.username === username);
  if (user) {
    user.isAdmin = false;
    res.json({ message: 'Admin rights removed' });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Endpoint to search users by username
app.get('/api/users/search', (req, res) => {
  const query = req.query.q.toLowerCase();
  const results = users.filter(user => user.username.toLowerCase().includes(query));
  res.json(results);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
  console.log("Hello World!");
});
