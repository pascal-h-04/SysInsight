const { json } = require("body-parser");
//Entschlüsseln des JSON-Files

function processFormData(formData, questions) {
  console.log('Aus Auswertung.js: Processing form data:', formData);
  let scoreGeneral = 0;
  let scoreSecurity = 0;
  let scoreKollaboration = 0;
  let scoreKommunikation = 0;
  // Extrahiere Paare aus FragenID und Antworten
  const pairs = Object.entries(formData).map(([id, { answer, internalCategory, weight, score }]) => {
    // Finde die Frage in den Fragen mit der entsprechenden ID
    const question = questions.find(q => q.id === id);
    // Hole den Wert aus den Options, falls die Frage diesen hat
    let score = answer;
    if (question && question.type === 'single-select') {
      score = question.options[answer];
    } else if (question && question.type === 'multi-select') {
      score = answer.reduce((sum, option) => sum + question.options[option], 0);
    } else if(question && question.id === "grosse_it_abteilung"){
        score = Math.floor(score/100);
    } 
    scoreBerechnen(id, weight, score, internalCategory);
    return {
      id,
      answer,
      internalCategory,
      weight,
      score 
    };
  }); 

  // Gib die Paare in der Konsole aus
  pairs.forEach((pair) => {
    console.log(`Auswertungsseite FragenID: ${pair.id}, Antwort: ${pair.answer}, Kategorie: ${pair.internalCategory}, Gewichtung: ${pair.weight}, score-Wert: ${pair.score}`);
  });

  // Hier könnte man die Formulardaten weiter verarbeiten, z.B. Scores berechnen
  // Für den Moment geben wir einfach die extrahierten Paare zurück
  return pairs;
}

function scoreBerechnen(id, weight, score, category) {

  switch(category){
    case "security":
      scoreSecurity += score * weight;
      break;
    case "kollaboration":
      scoreKollaboration += score * weight;
      break;
    case "kommunikation":
      scoreKommunikation += score * weight;
      break;
  }
  scoreGeneral = score * weight;
  console.log("ScoreGeneral: " + scoreGeneral);
}


module.exports = {
  processFormData,
};






