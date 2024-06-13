DROP DATABASE SemanTec;
CREATE DATABASE IF NOT EXISTS SemanTec;
USE SemanTec;

CREATE TABLE Nutzer (
    ID INT PRIMARY KEY,
    Nutzer_Name VARCHAR(255),
    Email VARCHAR(255)
);

CREATE TABLE Unternehmen (
    ID INT PRIMARY KEY,
    Unternehmen_Name VARCHAR(255)
);

CREATE TABLE Fragen (
    ID INT PRIMARY KEY,
    Fragen_Name VARCHAR(255),
    Gewichtung INT
);

CREATE TABLE Antworten (
    ID INT PRIMARY KEY,
    Antwort VARCHAR(255),
    Kategorie VARCHAR(255),
    FrageID INT,
    FOREIGN KEY (FrageID) REFERENCES Fragen(ID)
);

CREATE TABLE Einschaetzung (
    ID INT PRIMARY KEY,
    Score INT,
    Kategorie VARCHAR(255),
    NutzerID INT,
    UnternehmenID INT,
    FOREIGN KEY (NutzerID) REFERENCES Nutzer(ID),
    FOREIGN KEY (UnternehmenID) REFERENCES Unternehmen(ID)
);

CREATE TABLE Angebot (
    ID INT PRIMARY KEY,
    Angebot_Name VARCHAR(255),
    Kategorie VARCHAR(255),
    Score INT,
    Bild VARCHAR(255),
    Beschreibung VARCHAR(255),
    EinschaetzungID INT,
    FOREIGN KEY (EinschaetzungID) REFERENCES Einschaetzung(ID)
);

CREATE TABLE NutzerAntworten (
    NutzerID INT,
    AntwortID INT,
    PRIMARY KEY (NutzerID, AntwortID),
    FOREIGN KEY (NutzerID) REFERENCES Nutzer(ID),
    FOREIGN KEY (AntwortID) REFERENCES Antworten(ID)
);

-- indexe
CREATE INDEX idx_fragen_gewichtung ON Fragen (Gewichtung);
CREATE INDEX idx_antworten_kategorie ON Antworten (Kategorie);
CREATE INDEX idx_einschaetzung_kategorie ON Einschaetzung (Kategorie);
CREATE INDEX idx_angebot_kategorie ON Angebot (Kategorie);