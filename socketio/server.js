const express = require("express")
const app = express()
const server = require("http").createServer(app)
const io = require("socket.io")(server)
const redis = require("redis").createClient()

io.on("connection", client => {
    console.log("Client connecté...")

    client.on("message", libelle => {
        if (client.nickname) {

            redis.lpush("messages", JSON.stringify({message: libelle, author: client.nickname}), (err, reply) => {
                console.log("Ajout dans redis d'un message. Nb messages " + reply)
            })

            client.broadcast.emit("message", {message: libelle, author: client.nickname})
            client.emit("message", {message: libelle, author: client.nickname})
        } else {
            client.emit("erreur", {message: "Vous devez être connecté avant de pouvoir envoyer des messages"})
        }
    })

    client.on("join", nickname => {

        redis.lpush("users", nickname, (err, nb) => {
            console.log("Ajout de l'utilsateur " + nickname)
        })

        // pour le client qui vient de rejoindre le chat, on affiche tous les users
        redis.lrange("users", 0, -1, (err, users) => {
            users.forEach(user => {
                client.emit("add chatter", user)
            })
        })

        redis.lrange("messages", 0, -1, (err, messages) => {
            messages.forEach(messageS => {
                const message = JSON.parse(messageS)

                client.emit("message", message)
            })
        })

        client.nickname = nickname
        client.emit("join", {message: "ok"})
        
        // pour les clients déjà connectés, on ajout seulement le nouveau chatter
        client.broadcast.emit("add chatter", nickname)
    })

    client.on("unjoin", () => {
        console.log("unjoin du client " + client.nickname)
        redis.lrem("users", 10, client.nickname, (err) => {
            if (err) console.log("Erreur", err)
        })
        
        client.broadcast.emit("unjoin", client.nickname)
    })
})

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/client.html")
})

server.listen("8080", () => {
    console.log("Serveur démarré...")
})
