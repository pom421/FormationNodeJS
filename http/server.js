const http = require("http")
const url = require("url")
const fs = require("fs")
const query = require("querystring")

console.log("url ", url)

//new url.URL("")

let nbReq = 1

const server = http.createServer((req, res) => {

    console.log("req ===", req.url)

    if (req.url === "/") {
        res.writeHead(200)
        res.write("<meta charset='utf-8'>")
        res.write("<h1>Liste de pages</h1>")
        res.write("<ul>")
        res.write("<li><a href='/html'>Récupération d'une page html</a></li>")
        res.write("<li><a href='/page?prenom=bob&nom=bouli'>Récupération d'une page avec param</a></li>")
        res.write("<li><a href='/timer'>Récupération d'une page timer</a></li>")
        res.write("<li><a href='/404'>Récupération d'une page 404</a></li>")
        res.write("<li><a href='/oizaeoiazu'>Récupération d'une page avec compteur</a></li>")
        res.write("<li><a href='/json'>Récupération un fichier JSON</a></li>")
        res.write("<li><a href='/form'>Récupération d'une page avec formulaire</a></li>")
        res.write("</ul>")
        res.end()
    }
    else if (req.url === "/form") {

        res.writeHead(200, {"Content-type": "text/html"})

        if (req.method === "GET") {
            fs.createReadStream("jdd-form/index.html").pipe(res)
        } else {

            let data = ""

            req.on("data", chunk => {
                data += chunk
            })

            req.on("end", () => {
                const user = query.parse(data)
                res.write("<meta charset='utf-8'>")
                res.write("<h1>Rappel</h1>")
                res.write(`Bonjour ${user.username}. <br>Rappel du password ${user.password} <br>(${user.date ? user.date : new Date()})`)
                res.end()
            })
        }


          
    // si on appelle sans nom de page on envoie un fichier html
    } else if (req.url === "/html") {
        res.writeHead(200, {"Content-Type": "text/html"})
        let inStream = fs.createReadStream("./jdd/index.html")
        inStream.pipe(res)

        /*
        inStream.on("data", (chunk) => {
            res.write(chunk)
        })

        inStream.on("end", () => {
            res.end()
        })
    */
    } else if (req.url.endsWith(".css")) {
        res.writeHead(200, {"Content-Type": "text/css"})
    
        fs.createReadStream("./jdd" + req.url).pipe(res)

    } else if (req.url.startsWith("/page")) {
        // localhost:3000/page?prenom=bob&nom=bouli
        res.writeHead(200)
        console.log("on est dans page")
        const user = query.parse(url.parse(req.url).query)
        console.log(JSON.stringify(user))
        res.write(`Bonjour ${user.prenom} ${user.nom}`)
        res.end()
        
    } else if (req.url === "/timer") {
        res.writeHead(200)
        // création d'un intervalle pour envoyer des données au fur et à mesure du temps
        const id = setInterval(() => {
            res.write(`Date : ${ new Date() }`)
        }, 2000)
        
        console.log("requête reçue")
        res.writeHead(200, { "Content-Type": "text/html", "Accept-Charset": "UTF-8"})
        res.write(`<html><head><meta charset="utf-8"></head><body><h1>Test Node</h1>Nb requêtes : ${ nbReq++ }`, "utf-8")
        res.write(`<br><span style='color:red'>${ req.url }</span><br>`)
        res.write(req.method)
        
        // on supprime l'intervalle au bout de 12 secondes
        setTimeout(() => {
            clearInterval(id)
            res.end()
        }, 12000)
    } else if (req.url === "/404") {
        res.writeHead(404)
        res.write("<h1>404 - Page not found</h1>")
        res.end()
    } else if (req.url === "/json") {
        res.writeHead(200, {"Content-Type": "text/html"})
        const ins = fs.createReadStream("./data.json")
        let data = ""
        let elements = {}
        let iteration = 1

        ins.on("data", chunk => {
            console.log(`Téléchargement #${iteration++}`)
            data += chunk
        })

        ins.on("end", () => {
            console.log("Fin du téléchargement")
            //console.log("data", data)
            elements = JSON.parse(data)

            console.log("Nb d'éléments", elements.length)
            
            const actifs = elements.filter(elt => {
                return elt.isActive
            })
            console.log("Nb d'éléments", actifs.length)

            res.write("<h1>Personnes actives</h1>")
            res.write("<ul>")
            actifs.forEach(element => {
                console.log(JSON.stringify(element))
                res.write(`<li>${element.name} ${element.company}</li>`)
            });
            res.write("</ul>")

            res.end()
        })

    } else {
        res.writeHead(200, { "Content-Type": "text/html", "Accept-Charset": "UTF-8"})
        res.write(`<html><head><meta charset="utf-8"></head><body><h1>Test Node</h1>Nb requêtes : ${ nbReq++ }`, "utf-8")
        res.write(`<br><span style='color:red'>${ req.url }</span><br>`)
        res.write(req.method)
        res.end()
    }

})

server.listen(3000, (err) => {
    if (err) throw err

    console.log("Serveur lancé")
})