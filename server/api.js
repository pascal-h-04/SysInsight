const express = require("express");
//const mysql = require("mysql");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());
app.use(bodyParser.json());
const dbport = 3002;

// Middleware für JSON-Requests
app.use(bodyParser.json());

const connection = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "mydatabase",
  port: 3306
});

// Alle Angebote löschen
app.delete("/api/angebote", (req, res) => {
  connection.query("DELETE FROM Angebote", (err, results) => {
    if (err) {
      console.error("Fehler beim Löschen der Daten:", err);
      res.status(500).send("Serverfehler");
      return;
    }
    res.send("Alle Angebote gelöscht");
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

// Neues Angebot hinzufügen
app.post("/api/angebote", (req, res) => {
  const { Name, Score, category, Beschreibung, Bild, NutzerID } = req.body;
  connection.query(
    "INSERT INTO Angebote (Name, Score, category, Beschreibung, Bild, NutzerID) VALUES (?, ?, ?, ?, ?, ?)",
    [Name, Score, category, Beschreibung, Bild, NutzerID],
    (err, results) => {
      if (err) {
        console.error("Fehler beim Hinzufügen des Eintrags:", err);
        res.status(500).send("Serverfehler");
        return;
      }
      res.send("Angebot hinzugefügt");
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


// Alle Einschätzungen anzeigen
app.get("/api/einschaetzungen", (req, res) => {
  connection.query("SELECT * FROM Einschaetzung", (err, results) => {
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
        res.status(404).send("Angebot nicht gefunden");
        return;
      }
      res.send("Angebot aktualisiert");
    }
  );
});

app.post("/api/einschaetzung", (req, res) => {
  const { ScoreKollaboration, ScoreKommunikation, ScoreSecurity, ScoreGeneral, NutzerID } = req.body;
  
  connection.query(
    "INSERT INTO Einschaetzung (ScoreKollaboration, ScoreKommunikation, ScoreSecurity, ScoreGeneral, NutzerID) VALUES (?, ?, ?, ?, ?)",
    [ScoreKollaboration, ScoreKommunikation, ScoreSecurity, ScoreGeneral, NutzerID],
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
