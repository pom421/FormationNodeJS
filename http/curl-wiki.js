const https = require("https")
const fs = require("fs")

const optionsSO = {
    hostname: "stackoverflow.com",
    port: 443,
    path: "/questions/16995184/nodejs-what-does-socket-hang-up-actually-mean",
    method: "GET"
}

const options = {
    hostname: "fr.wikipedia.org",
    port: 443,
    path: "/wiki/Node.js",
    method: "GET"
}

const req = https.request(options, (res) => {

    console.log("Récupération de la réponse")

    let data = ""
    let out = fs.createWriteStream("download.html")
    let downloadSize = 0
    const size = res.headers["content-length"]

    console.log("status", res.statusCode)

    res.on("data", (chunk) => {
        downloadSize += chunk.length
        const pourcentage = Math.floor((downloadSize / size) * 100)
        console.log(`=== Téléchargement  ${ pourcentage }% ===`)
        data += chunk
        out.write(chunk)
    })

    res.on("end", () => {
        //console.log("on a trouvé", data)
        console.log("Téléchargement du fichier dans download.html")
        out.end()
    })
})

req.on("error", (err) => {
    if (err) console.log(err)
})

req.end()