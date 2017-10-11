const express = require("express")
const morgan = require("morgan")
const bodyparser = require("body-parser")
const session = require("express-session")

const app = express()

let annuaire = [
    {
        login: "pom",
        nom: "mauguet",
        prenom: "pierre-olivier"
    },
    {
        login: "joe24",
        nom: "silver",
        prenom: "joe"
    },
    {
        login: "coco",
        nom: "cohen",
        prenom: "ethan"
    }
]

app.use(morgan("combined"))
    .use(bodyparser.urlencoded({ extended: false }))
    .use(express.static('public'))
    
app.set("view engine", "ejs")

app.get("/hello", (req, res) => {
    res.send("Hello world")
})

app.post("/", (req, res) => {
    console.log("username", req.body.username)
    const html = `Formulaire envoyé (${req.body.date})<br>
        Nom ${req.body.username}`
    res.send(html)
})

app.get("/agenda", (req, res) => {
    res.render("agenda-form.ejs", { users: annuaire })
})

app.post("/agenda", (req, res) => {
    const newUser = {
        login: req.body.login,
        nom: req.body.nom,
        prenom: req.body.prenom
    }
    
    let annuaire = session.annuaire || []
    annuaire.push(newUser)
    session.annuaire = annuaire

    console.log("annuaire", JSON.stringify(annuaire))

    res.render("agenda-form.ejs", { users: annuaire })
})

app.listen(8080, () => {
    console.log("Serveur démarré")
})