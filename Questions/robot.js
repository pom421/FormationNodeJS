var questions = [
    {
        question: "Comment t'appelles-tu?",
    },
    {
        question: "Que fais-tu dans la vie?",
    },
    {
        question: "Quel est ton langage de développement préféré?",
    }
]

var answers = []
var toId

function createTimer(message, duration, cb) {
    return setTimeout(() => {
        console.log(message)
        if (cb) cb()
    }, duration)
}

function putTimer() {
    clearTimeout(toId)
    toId = createTimer("Tu es là?", 2000, () => {
        toId = createTimer("Allo?", 3000, () => {
            toId = createTimer("Bon...", 4000)
        })
    })
}

//----

const reactions = ["Tu es là?", "Allo?", "Bon..."]

let idReactions = 0
let intervalId

function putInterval() {
    clearInterval(intervalId)
       
    idReactions = 0
    intervalId = setInterval(function() {
        if (idReactions === reactions.length-1) {
            clearInterval(intervalId)
        }
        console.log(reactions[idReactions++])
    }, 3000)
}

//putTimer()

console.log(questions[0].question)

putInterval()

process.stdin.on("data", buffer => {
    //putTimer()
    putInterval()
    
    answers.push(buffer.toString().replace('\r\n', ''))

    if (answers.length === questions.length) {
        process.exit()
    }
    console.log(questions[answers.length].question)
});

process.on("exit", () => {
    console.log(answers.join(' '))
})

