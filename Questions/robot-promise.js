const util = require("util")

var questions = [
    {
        id: 1,
        question: "Comment t'appelles-tu?",
    },
    {
        id: 2,
        question: "Que fais-tu dans la vie?",
    },
    {
        id: 3,
        question: "Quel est ton langage de développement préféré?",
    }
]

/*
questions.map(curr => {
    idQuestion = curr.id
    console.log(curr.question)
})
*/

var answers = []

const reactions = [
    "Tu es là?",
    "Allo ?", 
    "Bon..."
]

console.log(questions[0].question)

var toId

function createTimer(message, duration, cb) {
    return setTimeout(() => {
        console.log(message)
        if (cb) cb()
    }, duration)
}

const createTimerP = util.promisify(createTimer)

createTimerP("Tu es là?", 2000)
    .then(toId => )


function putTimer() {
    clearTimeout(toId)
    toId = createTimer("Tu es là?", 2000, () => {
        toId = createTimer("Allo?", 3000, () => {
            toId = createTimer("Bon...", 4000)
        })
    })
}

putTimer()

process.stdin.on("data", buffer => {
    //console.log("buffer", buffer.toString())

    putTimer()

    answers.push(buffer.toString().replace('\r\n', ''))

    if (answers.length === questions.length) {
        process.exit()
    }
    console.log(questions[answers.length].question)
});

process.on("exit", () => {
    console.log(answers.join(' '))
})
