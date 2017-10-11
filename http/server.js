const http = require("http")

let nbReq = 1

const server = http.createServer((req, res) => {
    console.log("requête reçue")
    res.writeHead(200, { "Content-Type": "text/html", "Accept-Charset": "UTF-8"})
    res.write(`<html><head><meta charset="utf-8"></head><body><h1>Test Node</h1>Nb requêtes : ${ nbReq++ }`, "utf-8")
    setTimeout(() => {
        res.write("<br><span style='color:red'>Alerte</span>")
        res.end("</body></html>")
    }, 3000)
})

server.listen(8080, (err) => {
    if (err) throw err

    console.log("Serveur lancé")
})