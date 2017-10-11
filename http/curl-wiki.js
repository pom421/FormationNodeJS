const https = require("https")
const fs = require("fs")

const options = {
    hotsname: "fr.wikipedia.org",
    port: 443,
    path: "wiki/Node.js",
    method: "GET"
}

https.request("https://fr.wikipedia.org/wiki/Node.js", (res) => {
    let data = ""
    let out = fs.createWriteStream("wiki-nodejs.html")

    res.on("data", (chunk) => {
        console.log("=== Téléchargement d'un morceau de page ===")
        data += chunk
        out.write(chunk)
    })

    res.on("end", () => {
        console.log("on a trouvé", data)
        out.end()
    })
})