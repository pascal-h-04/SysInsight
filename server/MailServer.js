/*const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const port = 3045;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client')));

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'semantec.sysinsight@gmail.com',
        pass: 'gbnuepaayjznleml' // Verwende hier das App-spezifische Passwort
    },
    logger: true, // Protokollierung aktivieren
    debug: true  // Debugging aktivieren
});

// Hinzufügen eines Log-Listeners für den Transporter
transporter.on('log', console.log);

// Middleware zur Protokollierung jeder eingehenden Anfrage
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.post('/send-email', (req, res) => {
    const { email } = req.body;

    if (!email) {
        console.error('Keine E-Mail-Adresse im Request-Body gefunden');
        return res.status(400).json({ message: 'E-Mail-Adresse fehlt' });
    }

    console.log(`Empfangene E-Mail-Adresse: ${email}`);

    const mailOptions = {
        from: 'semantec.sysinsight@gmail.com',
        to: email,
        subject: 'Test E-Mail',
        text: 'Das ist eine Test E-Mail von deiner Webseite.'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Fehler beim Senden der E-Mail:', error);
            return res.status(500).json({ message: 'Fehler beim Senden der E-Mail', error: error.toString() });
        }
        console.log('E-Mail erfolgreich gesendet:', info.response);
        res.status(200).json({ message: 'E-Mail erfolgreich gesendet' });
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/src/mail.html'));
});

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
*/
