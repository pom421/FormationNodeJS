const express = require("express")
const app = express()
const server = require("http").createServer(app)
const io = require("socket.io")(server)

io.on("connection", client => {
    console.log("Client connecté...")

    client.on("message", libelle => {
        if (client.nickname) {
            client.broadcast.emit("message", {message: libelle, author: client.nickname})
            client.emit("message", {message: libelle, author: client.nickname})
        } else {
            client.emit("erreur", {message: "Vous devez être connecté avant de pouvoir envoyer des messages"})
        }
    })

    client.on("join", nickname => {
        client.nickname = nickname
        client.emit("join", {message: "ok"})
    })

    client.on("unjoin", () => {
        client.nickname = ""
    })
})

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/client.html")
})

server.listen("8080", () => {
    console.log("Serveur démarré...")
})
