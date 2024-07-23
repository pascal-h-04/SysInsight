const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
const dbport = 3002;

app.use(bodyParser.json());
app.use(cors());

const connection = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "mydatabase",
  port: 3306
});

// Offer für Nutzer scores anzeigen
app.get("/api/angebote", (req, res) => {
  const { scores } = req.query;
  

  const parsedScores = JSON.parse(scores);

  //  SQL query vorbereiten
  const query = `
    (SELECT * FROM Angebote WHERE category = 'Kommunikation' AND Score = ? LIMIT 1)
    UNION
    (SELECT * FROM Angebote WHERE category = 'Kollaboration' AND Score = ? LIMIT 1)
    UNION
    (SELECT * FROM Angebote WHERE category = 'IT-Sicherheit' AND Score = ? LIMIT 1)
  `;
  
  
  const queryParams = [
    parsedScores.kommunikation,
    parsedScores.kollaboration,
    parsedScores.security,
  ];

  connection.query(query, queryParams, (err, results) => {
    if (err) {
      console.error("Fehler beim Abrufen der Daten:", err);
      res.status(500).send("Serverfehler");
      return;
    }
    res.json(results);
  });
});

// Alle Angebote anzeigen
app.get("/api/alleangebote", (req, res) => {
  const query = "SELECT * FROM Angebote";

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Fehler beim Abrufen der Daten:", err);
      res.status(500).send("Serverfehler");
      return;
    }
    res.json(results);
  });
});


// Neues Offer hinzufügen
app.post("/api/angebote", (req, res) => {
  const { ID, Name, Score, category, Beschreibung, Bild } = req.body;
  connection.query(
    "INSERT INTO Angebote (ID, Name, Score, category, Beschreibung, Bild) VALUES (?, ?, ?, ?, ?, ?)",
    [ID, Name, Score, category, Beschreibung, Bild],
    (err, results) => {
      if (err) {
        console.error("Fehler beim Hinzufügen des Eintrags:", err);
        res.status(500).send("Serverfehler");
        return;
      }
      res.send("Offer hinzugefügt");
    }
  );
});

// Offer aktualisieren
app.put("/api/angebote/:id", (req, res) => {
  const { id } = req.params;
  const { Name, Score, category, Beschreibung, Bild } = req.body;

  connection.query(
    "UPDATE Angebote SET Name = ?, Score = ?, category = ?, Beschreibung = ?, Bild = ? WHERE ID = ?",
    [Name, Score, category, Beschreibung, Bild, id],
    (err, results) => {
      if (err) {
        console.error("Fehler beim Aktualisieren des Eintrags:", err);
        res.status(500).send("Serverfehler");
        return;
      }
      if (results.affectedRows === 0) {
        res.status(404).send("Offer nicht gefunden");
        return;
      }
      res.send("Offer aktualisiert");
    }
  );
});

//Offer löschen
app.delete("/api/angebote/:id", (req, res) => {
  const { id } = req.params;

  connection.query(
    "DELETE FROM Angebote WHERE ID = ?",
    [id],
    (err, results) => {
      if (err) {
        console.error("Fehler beim Löschen des Eintrags:", err);
        res.status(500).send("Serverfehler");
        return;
      }
      if (results.affectedRows === 0) {
        res.status(404).send("Offer nicht gefunden");
        return;
      }
      res.send("Offer gelöscht");
    }
  );
});

// Nutzer anlegen
app.post("/api/nutzer", (req, res) => {
  const { Name, pw, isAdmin } = req.body;
  connection.query(
    "INSERT INTO Nutzer (Name, pw, isAdmin) VALUES (?, ?, ?)",
    [Name, pw, isAdmin],
    (err, results) => {
      if (err) {
        console.error("Fehler beim Hinzufügen des Eintrags:", err);
        res.status(500).send("Serverfehler");
        return;
      }
      res.send("Nutzer hinzugefügt");
    }
  );
});

//Login bzw. Nutzer überprüfen
app.post("/api/login", (req, res) => {
  const { Name, pw } = req.body;

  connection.query(
    "SELECT * FROM Nutzer WHERE Name = ? AND pw = ?",
    [Name, pw],
    (err, results) => {
      if (err) {
        console.error("Fehler beim Abrufen der Daten:", err);
        res.status(500).send("Serverfehler");
        return;
      }
      if (results.length > 0) {
        const user = results[0];
        res.json({
          auth: true,
          isAdmin: user.isAdmin, 
          userID: user.ID 
        });
      } else {
        res.json({ auth: false });
      }
    }
  );
});

// API zum Abrufen des Benutzers und seiner Rolle
app.post("/api/user", (req, res) => {
  const { Name} = req.body;

  connection.query(
    "SELECT * FROM Nutzer WHERE Name = ?",
    [Name],
    (err, results) => {
      if (err) {
        console.error("Fehler beim Abrufen der Daten:", err);
        res.status(500).send("Serverfehler");
        return;
      }
      if (results.length > 0) {
        const user = results[0];
        res.json({
          auth: true,
          isAdmin: user.isAdmin,
          userID: user.ID
        });
      } else {
        res.json({ auth: false });
      }
    }
  );
});

// API zum Befördern eines Nutzers zum Admin
app.post("/api/user/promote", (req, res) => {
  const { Name } = req.body;

  connection.query(
    "UPDATE Nutzer SET isAdmin = 1 WHERE Name = ?",
    [Name],
    (err, results) => {
      if (err) {
        console.error("Fehler beim Aktualisieren des Eintrags:", err);
        res.status(500).send("Serverfehler");
        return;
      }
      if (results.affectedRows === 0) {
        res.status(404).send("Nutzer nicht gefunden");
        return;
      }
      res.send("Nutzer zu Admin befördert");
    }
  );
});

// API zum Entfernen der Admin-Rechte eines Nutzers
app.post("/api/user/remove", (req, res) => {
  const { Name } = req.body;

  connection.query(
    "UPDATE Nutzer SET isAdmin = 0 WHERE Name = ?",
    [Name],
    (err, results) => {
      if (err) {
        console.error("Fehler beim Aktualisieren des Eintrags:", err);
        res.status(500).send("Serverfehler");
        return;
      }
      if (results.affectedRows === 0) {
        res.status(404).send("Nutzer nicht gefunden");
        return;
      }
      res.send("Admin-Rechte entfernt");
    }
  );
});

// Nutzer Passwort ändern
app.put("/api/nutzer/:id", (req, res) => {
  const { id } = req.params;
  const { pw } = req.body;

  connection.query(
    "UPDATE Nutzer SET pw = ? WHERE ID = ?",
    [pw, id],
    (err, results) => {
      if (err) {
        console.error("Fehler beim Aktualisieren des Eintrags:", err);
        res.status(500).send("Serverfehler");
        return;
      }
      if (results.affectedRows === 0) {
        res.status(404).send("Nutzer nicht gefunden");
        return;
      }
      res.send("Nutzer Passwort aktualisiert");
    }
  );
});


//  Einschätzungen anzeigen
app.get("/api/einschaetzungen/:NutzerID", (req, res) => {
  const NutzerID = req.params.NutzerID; // Nutze req.params.NutzerID hier
  connection.query("SELECT * FROM Einschaetzung WHERE NutzerID = ?", NutzerID, (err, results) => {
    if (err) {
      console.error("Fehler beim Abrufen der Daten:", err);
      res.status(500).send("Serverfehler");
      return;
    }
    res.json(results);
  });
});


// Alle Angebote anzeigen
app.get("/api/angebote", (req, res) => {
  connection.query("SELECT * FROM Angebote", (err, results) => {
    if (err) {
      console.error("Fehler beim Abrufen der Daten:", err);
      res.status(500).send("Serverfehler");
      return;
    }
    res.json(results);
  });
});

// Eintrag aktualisieren
app.put("/api/angebote/:id", (req, res) => {
  const { id } = req.params;
  const { Name, Score, category, Beschreibung, Bild, NutzerID } = req.body;

  connection.query(
    "UPDATE Angebote SET Name = ?, Score = ?, category = ?, Beschreibung = ?, Bild = ?, NutzerID = ? WHERE ID = ?",
    [Name, Score, category, Beschreibung, Bild, NutzerID, id],
    (err, results) => {
      if (err) {
        console.error("Fehler beim Aktualisieren des Eintrags:", err);
        res.status(500).send("Serverfehler");
        return;
      }
      if (results.affectedRows === 0) {
        res.status(404).send("Offer nicht gefunden");
        return;
      }
      res.send("Offer aktualisiert");
    }
  );
});

//Einschätzung hinzufügen
app.post("/api/einschaetzung", (req, res) => {
  const { ScoreKollaboration, ScoreKommunikation, ScoreSecurity, NutzerID } = req.body;
  
  connection.query(
    "INSERT INTO Einschaetzung (ScoreKollaboration, ScoreKommunikation, ScoreSecurity, NutzerID) VALUES (?, ?, ?, ?)",
    [ScoreKollaboration, ScoreKommunikation, ScoreSecurity, NutzerID],
    (err, results) => {
      if (err) {
        console.error("Fehler beim Hinzufügen der Einschätzung:", err);
        return res.status(500).send("Fehler beim Hinzufügen der Einschätzung: " + err.message);
      }
      console.log("Einschätzung hinzugefügt:", results);
      return res.sendStatus(200);
    }
  );
});

// Server starten
app.listen(dbport, () => {
  console.log(`Server für Datenbankabfragen gestartet auf Port ${dbport}`);
});
