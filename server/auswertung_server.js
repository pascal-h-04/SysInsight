const axios = require('axios');
const nodemailer = require('nodemailer');
const expressBaseUrl = 'http://localhost:3002';

function processFormData(formData) {
  console.log('Aus Auswertung_client.js: Processing form data:', formData);

  let scoreGeneral = 0;
  let scoreSecurity = 0;
  let scoreKollaboration = 0;
  let scoreKommunikation = 0;
  const email = formData.email.answer;
  const password = generateRandomPassword(12);

  // Protokollieren der Antworten
  Object.entries(formData).forEach(([questionId, q]) => {
    if (!q) {
      console.log('Error: Question is undefined');
      return;
    }

    console.log(`Question ID: ${questionId}`);
    console.log(`Answer: ${q.answer}`);
    console.log(`Category: ${q.internalCategory}`);
    console.log(`Weight: ${q.weight}`);
    console.log(`Score: ${q.score}`);

    console.log("Email-Adresse ist: " + email);

    let score = q.score || 0;

    scoreBerechnen(score, q.weight, q.internalCategory);
  });

  mail_verschicken(email, password);

  function mail_verschicken(email, password) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'semantec.sysinsight@gmail.com',
        pass: 'gbnuepaayjznleml' // Verwende hier das App-spezifische Passwort
      }
    });

    const mailOptions = {
      from: 'semantec.sysinsight@gmail.com',
      to: email,
      subject: 'Ihr neues Passwort',
      text: `Ihr neues Passwort lautet: ${password}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Fehler beim Senden der E-Mail:', error);
      } else {
        console.log('E-Mail erfolgreich gesendet:', info.response);
      }
    });
  }

  function scoreBerechnen(score, weight, category) {
    const weightedScore = score * weight;
    switch (category) {
      case "Security":
        scoreSecurity += weightedScore;
        break;
      case "Kollaboration":
        scoreKollaboration += weightedScore;
        break;
      case "Kommunikation":
        scoreKommunikation += weightedScore;
        break;
      case "Allgemeines":
        scoreGeneral += weightedScore;
        break;
      case "ignore":
        break;
    }
  }

  scoreSecurity = scoreSecurity / 7;
  scoreKollaboration = scoreKollaboration / 5;
  scoreKommunikation = scoreKommunikation / 4;
  saveUser(email, password);

  async function saveUser(email, password) {
    try {
      const response = await axios.post(`${expressBaseUrl}/api/nutzer`, {
        Name: email,
        pw: password,
        isAdmin: false,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('User erfolgreich gesendet!');
      // Rufe die UserID basierend auf der E-Mail-Adresse ab
      const userID = await getUserIDFromDatabase(email, password);

      if (userID) {
        console.log('UserID erhalten:', userID);
        sendEinschaetzung(scoreSecurity, scoreKollaboration, scoreKommunikation, scoreGeneral, userID);
      } else {
        console.log('UserID konnte nicht abgerufen werden.');
      }

    } catch (error) {
      console.error('Fehler beim Senden des Users:', error.message);
    }
  }

  const getUserIDFromDatabase = async (Name, pw) => {
    try {
      const response = await axios.post('http://localhost:3002/api/login', {
        Name,
        pw,
      });
      return response.data.userID;
    } catch (error) {
      console.error('Fehler beim Abrufen der UserID aus der Datenbank:', error.message);
      throw error;
    }
  };

  async function sendEinschaetzung(scoreSecurity, scoreKollaboration, scoreKommunikation, scoreGeneral, nutzerID) {
    try {
      const response = await axios.post(`${expressBaseUrl}/api/einschaetzung`, {
        ScoreSecurity: scoreSecurity,
        ScoreKollaboration: scoreKollaboration,
        ScoreKommunikation: scoreKommunikation,
        ScoreGeneral: scoreGeneral,
        NutzerID: nutzerID
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Einschätzung erfolgreich gesendet!');
    } catch (error) {
      console.error('Fehler beim Senden der Einschätzung:', error.message);
    }
  }

  return {
    scoreGeneral,
    scoreSecurity,
    scoreKollaboration,
    scoreKommunikation
  };
}

function generateRandomPassword(length) {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

module.exports = {
  processFormData,
};
