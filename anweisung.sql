DROP DATABASE IF EXISTS SysInsight;
CREATE DATABASE IF NOT EXISTS SysInsight;
USE SysInsight;

CREATE TABLE Nutzer
(
    ID            INT AUTO_INCREMENT PRIMARY KEY,
    Name          VARCHAR(255),
    pw            VARCHAR(255),
    isAdmin       BOOLEAN DEFAULT FALSE
);

CREATE TABLE Einschaetzung
(
    ID            INT AUTO_INCREMENT PRIMARY KEY,
    ScoreKollaboration INT,
    ScoreKommunikation INT,
    ScoreSecurity INT,
    ScoreGeneral INT,
    NutzerID      INT,
    FOREIGN KEY (NutzerID) REFERENCES Nutzer(ID)
);

CREATE  TABLE Angebote
(
    ID            INT AUTO_INCREMENT PRIMARY KEY,
    Name          VARCHAR(255),
    Score         INT,
    category      VARCHAR(255),
    Beschreibung  VARCHAR(255),
    Bild           VARCHAR(255),
);

-- Beispielzeile für die Tabelle Nutzer
INSERT INTO Nutzer (Name, pw, isAdmin) VALUES ('Max Mustermann', 'geheimesPasswort', TRUE);

-- Beispielzeile für die Tabelle Einschaetzung
INSERT INTO Einschaetzung (ScoreKollaboration, ScoreKommunikation, ScoreSecurity, ScoreGeneral, NutzerID) 
VALUES (8, 7, 9, 8, 1);  -- Angenommen, NutzerID 1 gehört zu 'Max Mustermann'

-- Beispielzeile für die Tabelle Angebote
INSERT INTO Angebote (Name, Score, category, Beschreibung, Bild, NutzerID) 
VALUES ('Produkt A', 95, 'Elektronik', 'Ein fortschrittliches Elektronikprodukt.', 'bild_pfad/produktA.jpg', 1);  -- Wieder NutzerID 1 für 'Max Mustermann'
