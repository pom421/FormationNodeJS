const question = require('./question')

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
})