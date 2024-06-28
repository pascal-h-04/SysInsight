const axios = require('axios');
const expressBaseUrl = 'http://localhost:3002'; 
function processFormData(formData) {
  console.log('Aus Auswertung.js: Processing form data:', formData);

  let scoreGeneral = 0;
  let scoreSecurity = 0;
  let scoreKollaboration = 0;
  let scoreKommunikation = 0;
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
  sendEinschaetzung(scoreSecurity, scoreKollaboration, scoreKommunikation, scoreGeneral, 1);
  
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
