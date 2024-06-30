const axios = require('axios');
const expressBaseUrl = 'http://localhost:3002'; 
function processFormData(formData) {
  console.log('Aus Auswertung.js: Processing form data:', formData);

  let scoreGeneral = 0;
  let scoreSecurity = 0;
  let scoreKollaboration = 0;
  let scoreKommunikation = 0;
  const email = formData.email.answer;
  const password = 'password';


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

    console.log("Email-Adresse ist: " + email)
    

    let score = q.score || 0;


    scoreBerechnen(score, q.weight, q.internalCategory);
  });

  function scoreBerechnen(score, weight, category) {
    console.log(typeof scoreGeneral);
    console.log(typeof weight);
    console.log(typeof score);
    const weightedScore = score * weight;
    console.log(typeof weightedScore);
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
        console.log(typeof scoreGeneral);
        break;  
      case "ignore":
        break;
      
    }
  }
  scoreSecurity = scoreSecurity /7;
  scoreKollaboration = scoreKollaboration /5;
  scoreKommunikation = scoreKommunikation /4;
  saveUser(email);
  

async function saveUser(email) {
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

module.exports = {
  processFormData,
};
