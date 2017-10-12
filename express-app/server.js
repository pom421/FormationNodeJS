const express = require("express")
const morgan = require("morgan")
const bodyparser = require("body-parser")
const session = require("express-session")

const app = express()

// CONFIGURATION

app.use(morgan("combined"))
    .use(bodyparser.urlencoded({ extended: false }))
    .use(express.static('public'))
    
app.set("view engine", "ejs")


let annuaire = session.annuaire || []

// ROUTES

app.get("/hello", (req, res) => {
    res.send("Hello world")
})

/*
app.post("/", (req, res) => {
    console.log("username", req.body.username)
    const html = `Formulaire envoyé (${req.body.date})<br>
        Nom ${req.body.username}`
    res.send(html)
})
*/

app.get("/", (req, res) => {
    console.log("annuaire", JSON.stringify(annuaire))

    res.render("agenda-liste", { users: annuaire })
})

app.post("/ajouterContact", (req, res) => {
    const newUser = {
        login: req.body.login,
        nom: req.body.nom,
        prenom: req.body.prenom,
        tel: req.body.tel,
        image: req.body.image
    }
    
    annuaire.push(newUser)

    console.log("annuaire", JSON.stringify(annuaire))

    res.redirect("/")
})

app.get("/ajouterContact", (req, res) => {

    res.render("agenda-form", { users: annuaire })
   
})

app.get("/supprimerContact/:login", (req, res) => {
    
    session.annuaire = annuaire = annuaire.filter(person => person.login != req.params.login)

    res.render("agenda-liste", { users: annuaire})
})

app.get("/apropos", (req, res) => {
    res.render("apropos")
})

app.listen(8080, () => {
    console.log("Serveur démarré")
})