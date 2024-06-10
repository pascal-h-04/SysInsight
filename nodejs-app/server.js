const express = require('express');
const app = express();
const port = 3001; // Verwenden Sie einen anderen Port als den, den Ihr React-Entwicklungsserver verwendet

app.get('/api', (req, res) => {
  res.send('Hello from the Node.js server!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
