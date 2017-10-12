const express = require("express")
const morgan = require("morgan")
const bodyparser = require("body-parser")
const session = require("express-session")
const bd = require("./bd")
const util = require("util")

const app = express()

// promesses pour les fonctions en base de données
const addUser = util.promisify(bd.addUser)
const allUsers = util.promisify(bd.allUsers)
const deleteUser = util.promisify(bd.deleteUser)

// CONFIGURATION

app.use(morgan("combined"))
    .use(bodyparser.urlencoded({ extended: false }))
    .use(express.static('public'))
    
app.set("view engine", "ejs")


let annuaire = session.annuaire || []

// ROUTES

app.get("/", (req, res) => {

    allUsers().then(rows => {
        res.render("agenda-liste", { users: rows })

    })
    .catch(err => {
        console.log("Erreur lors de l'affichage de la liste des utilisateurs")
    })

})

app.post("/ajouterContact", (req, res) => {
    const newUser = {
        login: req.body.login,
        nom: req.body.nom,
        prenom: req.body.prenom,
        tel: req.body.tel,
        image: req.body.image
    }

    addUser(newUser)
        .then(() => {
            console.log(`Utilisateur ${newUser.login} ajouté`)
        })
        .catch(err => {
            console.log(`Erreur lors de l'ajout de l'utilisateur ${newUser.login}`)
        })

    res.redirect("/")
})

app.get("/ajouterContact", (req, res) => {

    res.render("agenda-form", { users: annuaire })
   
})

app.get("/supprimerContact/:id", (req, res) => {
    
    //session.annuaire = annuaire = annuaire.filter(person => person.login != req.params.login)

    deleteUser(req.params.id)
        .then(() => { 
            console.log(`L'utilisateur (id: ${req.params.id}) a été supprimé`)
        })
        .catch(err => {
            console.log("Erreur lors de la tentative de suppression de l'utilisateur", err)
        })

    //res.render("agenda-liste", { users: annuaire})
    res.redirect("/")
})

app.get("/apropos", (req, res) => {
    res.render("apropos")
})

app.listen(8080, () => {
    console.log("Serveur démarré")
})