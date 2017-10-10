const readline = require("readline")

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.on("close", () => {
    console.log("on close le rl")
    //console.log("Vos réponse", JSON.stringify(question.answers))
})

var question = {
    
    answers: [],

    addQuestions: function addQuestions(questions) {
        this.questions = questions
        return this
    },

    askQuestion: function askQuestion(idQuestion) {
        
        if (idQuestion >= this.questions.length) {
            rl.close()
            return
        }
    
        rl.question(this.questions[idQuestion].text + " ", answer => {
            this.answers.push(answer)
            this.askQuestion(this.answers.length)
        })
        
    }, 

    getAnswers: function getAnswers() {
        return this.answers
    }

}

module.exports = question