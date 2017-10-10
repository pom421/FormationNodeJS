const fs = require("fs")
const path = require("path")

const libDir = path.join(__dirname, "jdd", "lib")

/*
fs.exists(path.join(libDir, "change.txt"), exists => {

    if (exists) {
        fs.unlink(path.join(libDir, "change.txt"), err => {
            if (err) throw err
            console.log("Suppression du fichier lib/change.txt")
        })
    }

})

fs.readdir("jdd", (err, files) => {
    files.forEach(file => {
        console.log("Fichier ", path.join(__dirname, "jdd", file))

        fs.stat(path.join(__dirname, "jdd", file), (err, stats) => {

            if (!stats.isDirectory()) {
                fs.readFile(path.join(__dirname, "jdd", file), (err, data) => {
                    process.stdout.write(`======================================= + ${ file } + ==================================================\n`)
                    if (err) console.error("Un fichier pose problème")
                    process.stdout.write(data + "\n")
                })
      
            }
        })

    })
})

fs.writeFile(path.join(__dirname, "jdd", "test.txt"), "Mon super contenu", err => {
    if (err) throw err
    process.stdout.write("Fichier text.txt modifié")
})


fs.exists(libDir, exists => {
    if (!exists) fs.mkdir(libDir, err => {
        if (err) throw err
        console.log("Création du répertoire lib")
    })
})*/

/*
fs.exists(path.join(__dirname, "jdd", "assets"), exists => {
    fs.readdir(path.join(__dirname, "jdd", "assets"), (err, files) => {
        files.forEach(file => {
            console.log("Tentative de suppression de %s", file)
            

            fs.unlink(path.join(__dirname, "jdd", "assets", file), err => {
                if (err) throw err
                console.log("Suppression de %s", file)
            })
        })
    })
})
*/

function deleteDir(dir) {

    if (fs.existsSync(dir)) {
        const files = fs.readdirSync(dir)
        files.forEach(file => {
            console.log("Tentative de suppression de %s", file)
            
            var stats = fs.statSync(path.join(dir, file))

            if (stats.isDirectory()) {
                deleteDir(path.join(dir, file))
                fs.rmdirSync(path.join(dir, file))
            } else {
                fs.unlinkSync(path.join(dir, file))
            }

        })
   }
}

deleteDir(path.join(__dirname, "jdd", "assets"))

var stream = fs.createReadStream(path.join("jdd", "lambda.js"), { highWaterMark: 16 * 1024})

fs.stat(path.join("jdd", "lambda.js"), (err, stats) => {
    const size = stats.size
    let sizeAlready = 0

    stream.on("data", chunk => {
        sizeAlready += chunk.length
        const progress = (sizeAlready / size) * 100

        console.log("Progression %s%", progress)
    }).on("end", () => {
        console.log("Fin de la lecture du stream")
    })

})


