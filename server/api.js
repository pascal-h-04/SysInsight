const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();

const port = 3020;

// Middleware für JSON-Requests
app.use(bodyParser.json());

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "SysInsight",
});

// Routen
// Alle Einträge löschen
app.delete("/api/eintraege", (req, res) => {
  connection.query("DELETE FROM Angebot", (err, results) => {
    if (err) {
      console.error("Fehler beim Löschen der Daten:", err);
      res.status(500).send("Serverfehler");
      return;
    }
    res.send("Alle Einträge gelöscht");
  });
});

// Alle Einträge anzeigen
app.get("/api/eintraege", (req, res) => {
  connection.query("SELECT * FROM Angebot", (err, results) => {
    if (err) {
      console.error("Fehler beim Abrufen der Daten:", err);
      res.status(500).send("Serverfehler");
      return;
    }
    res.json(results);
  });
});
eintraege

// Neuen Eintrag hinzufügen
app.post("/api/", (req, res) => {
  const { name, beschreibung } = req.body;
  connection.query(
    "INSERT INTO Angebot(name, beschreibung) VALUES (?, ?)",
    [name, beschreibung],
    (err, results) => {
      if (err) {
        console.error("Fehler beim Hinzufügen des Eintrags:", err);
        res.status(500).send("Serverfehler");
        return;
      }
      res.send("Eintrag hinzugefügt");
    }
  );
});


// Neue Antwort hinzufügen
app.post("/api/angebot", (req, res) => {
  const { name, beschreibung, fragenId } = req.body;
  connection.query(
    "INSERT INTO Antwort(Antwort, Kategorie, FragenID) VALUES (?, ?, ?)",
    [name, beschreibung, fragenId],
    (err, results) => {
      if (err) {
        console.error("Fehler beim Hinzufügen des Eintrags:", err);
        res.status(500).send("Serverfehler");
        return;
      }
      res.send("Eintrag hinzugefügt");
    }
  );
});




// Nutzer anlegen
app.post("/api/nutzer", (req, res) => {
  const { name, beschreibung } = req.body;
  connection.query(
    "INSERT INTO Nutzer(name, Passwort) VALUES (?, ?)",
    [name, beschreibung],
    (err, results) => {
      if (err) {
        console.error("Fehler beim Hinzufügen des Eintrags:", err);
        res.status(500).send("Serverfehler");
        return;
      }
      res.send("Eintrag hinzugefügt");
    }
  );
});

// Nutzer Passwort ändern
app.put("/api/nutzer/:name", (req, res) => {
  const { name } = req.params; // Name des zu aktualisierenden Eintrags
  const { passwort } = req.body; // Neues Passwort für den Eintrag

  connection.query(
    "UPDATE Nutzer SET passwort = ? WHERE name = ?",
    [passwort, name],
    (err, results) => {
      if (err) {
        console.error("Fehler beim Aktualisieren des Eintrags:", err);
        res.status(500).send("Serverfehler");
        return;
      }
      if (results.affectedRows === 0) {
        res.status(404).send("Eintrag nicht gefunden");
        return;
      }
      res.send("Eintrag aktualisiert");
    }
  );
});

// Einschätzung anlegen
app.post("/api/einschätzung", (req, res) => {
  const { nutzerId, score, Kategorie } = req.body;
  connection.query(
    "INSERT INTO Einschätzung (nutzerId, score, Kategorie) VALUES (?, ?, ?)",
    [nutzerId, score, Kategorie],
    (err, results) => {
      if (err) {
        console.error("Fehler beim Hinzufügen des Eintrags:", err);
        res.status(500).send("Serverfehler");
        return;
      }
      res.send("Eintrag hinzugefügt");
    }
  );
});

// Einschätzung abrufen
app.get("/api/einschätzung", (req, res) => {
  connection.query("SELECT * FROM Einschätzung", (err, results) => {
    if (err) {
      console.error("Fehler beim Abrufen der Einträge:", err);
      res.status(500).send("Serverfehler");
      return;
    }
    res.json(results);
  });
});



// Eintrag aktualisieren
app.put("/api/eintraege/:id", (req, res) => {
  const { id } = req.params; // ID des zu aktualisierenden Eintrags
  const { name, beschreibung } = req.body; // Neue Werte für den Eintrag

  connection.query(
    "UPDATE Angebot SET name = ?, beschreibung = ? WHERE id = ?",
    [name, beschreibung, id],
    (err, results) => {
      if (err) {
        console.error("Fehler beim Aktualisieren des Eintrags:", err);
        res.status(500).send("Serverfehler");
        return;
      }
      if (results.affectedRows === 0) {
        res.status(404).send("Eintrag nicht gefunden");
        return;
      }
      res.send("Eintrag aktualisiert");
    }
  );
});
// Server starten
app.listen(port, () => {
  console.log(`Server gestartet auf Port ${port}`);
});
