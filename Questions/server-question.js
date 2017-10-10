
const question = require('./question')
const fs = require('fs')

var questions = [
    {
        text: "Comment t'appelles-tu?",
    },
    {
        text: "Que fais-tu dans la vie?",
    },
    {
        text: "Quel est ton langage de développement préféré?",
    }
]

question
    .addQuestions(questions)
    .askQuestion(0)

process.on("exit", () => {
    console.log("Sortie de %s", __filename)
    console.log("Réponses ", JSON.stringify(question.getAnswers()))

    fs.appendFileSync("answers.txt", JSON.stringify(question.getAnswers()), "utf-8")
})
