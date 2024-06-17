const { json } = require("body-parser");
//Entschlüsseln des JSON-Files

function processFormData(formData) {
  // Beispiel: Gib die Formulardaten in der Konsole aus
  console.log('Aus Auswertung.js: Processing form data:', formData);

  // Extrahiere Paare aus FragenID und Antworten
  const pairs = Object.entries(formData).map(([id, { answer, internalCategory, weight }]) => ({
    id,
    answer,
    internalCategory,
    weight
  }));

  // Gib die Paare in der Konsole aus
  pairs.forEach((pair) => {
    console.log(`Auswertungsseite FragenID: ${pair.id}, Antwort: ${pair.answer}, Kategorie: ${pair.internalCategory}, Gewichtung: ${pair.weight}`);
  });

  // Hier könnte man die Formulardaten weiter verarbeiten, z.B. Scores berechnen
  // Für den Moment geben wir einfach die extrahierten Paare zurück

  return pairs;
}

module.exports = {
  processFormData,
};


//Hinweis: score & caetgory anpassen an answer & internalCategory
function extractAttributesFroMJson(jsonPath) {
    const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    const attributes = [];
    jsonData.questions.forEach(question => {
        const id = question.id;
        const weight = question.weight;
        const internalCategory = question.internalCategorycategory;
        const score = question.score; // fehlt noch
        attributes.push({ id, weight, internalCategory, score });
    });
    
    return attributes;
}


//Berechnung des Scores
function scoreSecurity(id, weight, score, category) {
  if (category === "security") {
    return weight * score;
  }
}
function scoreKollaboration(id, weight, score, category) {
  if (category === "kollaboration") {
    return weight * score;
  }
}
function scoreKommunikation(id, weight, score, category) {
  if (category === "kommunikation") {
    return weight * score;
  }
}
function scoreGenerell(id, weight, score, category) {
  return weight * score;
}

//übergibgt Score an Frontend
function scoreÜbergeben(id, weight, score, category) {
  return (
    scoreSecurity(id, weight, score, category) +
    scoreKollaboration(id, weight, score, category) +
    scoreKommunikation(id, weight, score, category) +
    scoreGenerell(id, weight, score, category)
  );
}
