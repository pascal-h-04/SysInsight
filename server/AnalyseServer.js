const axios = require('axios');
const nodemailer = require('nodemailer');
const expressBaseUrl = 'http://localhost:3002';

function processFormData(formData) {

  let scoreSecurity = 0;
  let scoreKollaboration = 0;
  let scoreKommunikation = 0;
  let countSecurity = 0;
  let countKollaboration = 0;
  let countKommunikation = 0;
      
  const email = formData.email.answer;
  const password = generateRandomPassword(12);

  // Protokollieren der Antworten
  Object.entries(formData).forEach(([questionId, q]) => {
    if (!q) {
      console.log('Error: Question is undefined');
      return;
    }


    scoreBerechnen(q.score, q.weight, q.internalCategory);
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
  //der Score ist das Produkt aus der Antwort und dem Gewicht der Frage
  //für jede Kategorie wird der Score und das Gewicht der Frage addiert
  function scoreBerechnen(score, weight, category) {
      const weightedScore = score * weight;
    
    switch (category) {
      case "Security":
        scoreSecurity += weightedScore;
        countSecurity += weight;
        break;
      case "Kollaboration":
        scoreKollaboration += weightedScore;
        countKollaboration += weight;
        break;
      case "Kommunikation":
        scoreKommunikation += weightedScore;
        countKommunikation += weight;
        break;
      case "ignore":
        break;
    }
  }
//Scores werden durch die Anzahl der Fragen geteilt, um den Durchschnitt zu berechnen (Gewichtung wird berücksichtigt)
  scoreSecurity = scoreSecurity / countSecurity; 
  scoreKollaboration = scoreKollaboration / countKollaboration;
  scoreKommunikation = scoreKommunikation / countKommunikation;
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
        sendEinschaetzung(scoreSecurity, scoreKollaboration, scoreKommunikation, userID);
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

  async function sendEinschaetzung(scoreSecurity, scoreKollaboration, scoreKommunikation, nutzerID) {
    try {
      const response = await axios.post(`${expressBaseUrl}/api/einschaetzung`, {
        ScoreSecurity: scoreSecurity,
        ScoreKollaboration: scoreKollaboration,
        ScoreKommunikation: scoreKommunikation,
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
