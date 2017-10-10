const readline = require("readline")

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

var answers = []

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function askQuestion(idQuestion) {

    if (idQuestion >= questions.length) {
        rl.close()
        return
    }

    rl.question(questions[idQuestion].text + " ", answer => {
        answers.push(answer)
        askQuestion(answers.length)
    })
    
}

askQuestion(0)

rl.on("close", () => {
    console.log("on close le rl")
})


process.on("exit", () => {
    console.log("Vos réponse", JSON.stringify(answers))
})

/* 
// Version avec prompt
rl.question(questions[0].question + " ", answer => {
    console.log("Votre réponse", answer)
    answers.push(answer)

    rl.setPrompt(questions[1].question)
    rl.prompt()

})

rl.on("line", line => {
    answers.push(line)
    rl.close()
})
*/