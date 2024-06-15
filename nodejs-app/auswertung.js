const { json } = require("body-parser");
//Entschlüsseln des JSON-Files
function extractAttributesFroMJson(jsonPath) {
    const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    const attributes = [];
    jsonData.questions.forEach(question => {
        const id = question.id;
        const weight = question.weight;
        const category = question.category;
        const score = question.score; // fehlt noch
        attributes.push({ id, weight, category, score });
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
function scoreÜbergeben (id, weight, score, category) {
    return scoreSecurity(id, weight, score, category) + scoreKollaboration(id, weight, score, category) + scoreKommunikation(id, weight, score, category) + scoreGenerell(id, weight, score, category);
}