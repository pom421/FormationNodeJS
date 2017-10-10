console.log("Spawn.js")

setInterval(() => {
    console.log(Math.round(Math.random() * 100) + "%")
}, 2500)

process.stdin.on("data", data => {
    console.log("echo", ":" + data.toString() + ":")
    if (data.toString().toLowerCase().includes("quit")) {
        console.log("Sortie demandée")
        process.exit()
    }
})

process.on("exit", code => {
    console.log("Fin du fils")
})
