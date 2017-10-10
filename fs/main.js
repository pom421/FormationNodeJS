const fs = require("fs")
const path = require("path")

const libDir = path.join(__dirname, "jdd", "lib")

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
})

