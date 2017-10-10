const child_process = require("child_process")
const EventEmitter = require("events").EventEmitter
const exitEE = new EventEmitter()

const workerProcess = child_process.exec("ipconfig", function(err, stdout, stderr) {
    if (err) {
        console.error(err.stack)
        console.error("Error code", err.code)
        console.error("Signal received", err.signal)
    }

    console.log("stdout", stdout)
    if (err) console.log("err", stderr)
})

// création d'un sous-processus avec qui on pourra interragir par le biais d'évènement et stdin/stdout
const workerProcess2 = child_process.spawn("node", ["spawn.js"])

// quand le sous-processus fils envoie des données
workerProcess2.stdout.on("data", function(data) {
    console.log("Affichage à partir du fils", data.toString(), "\n")
})

// quand le procesus père envoie les données tapées par l'utilisateur
process.stdin.on("data", data => {
    workerProcess2.stdin.write(data)
})

// quand le sous-processus fils s'arrête
workerProcess2.on("exit", code => {
    console.log("Fin du script")
    process.exit()
})

process.stdin.on("data", data => {
    console.log("Data trouvé", data.toString())
    if (data.toString().includes("exit")) {
        exitEE.emit("myExit", "Fin de l'app")
    }
})

exitEE.on("myExit", msg => {
    console.log("On sort de l'app")
    process.exit()
})