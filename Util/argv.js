/*
console.log("dirname", __dirname)
console.log("filename", __filename)
console.trace("ma trace")

console.time("timer")

setTimeout(function() {
    console.log("Fin de traitement")
    console.timeEnd("timer")
}, 5000)
*/

// exemple d'appel : node main.js --name ilyasse --message bonjour 

/*
process.argv.forEach(function(a) {
    console.log("argument ", a)
})

const args = process.argv.slice(2)

let obj = {
    name: "",
    message: ""
}

var i = 0;
while (i < args.length) {
    if (args[i] === "--name") {
        obj.name = args[i+1] ? args[i + 1] : "not defined"
        i++
    } else {
        if (args[i] === "--message") {
            obj.message = args[ i + 1 ]? args[ i + 1 ] : "not defined"
        }
        i++
    }
    i++
}
*/

const args = process.argv.slice(2)

function getValue(key) {
    const index = args.indexOf(key)
    if (index === -1) return undefined
    return args[index + 1]
}

const name = getValue("--name")
const message = getValue("--message")

let retour = (name !== undefined && message !== undefined) ? name + " : " + message : "Pas de message"

console.log(retour)

/*
process.stdin.on('data', buffer => {
    process.stdout.write(buffer.toString().toUpperCase())
    process.exit();
})

*/

setTimeout(function() {
    console.log("toto")
}, 5000)

process.on('exit', function() {
    console.log("FIN DU SCRIPT")
})

process.on('SIGINT', function() {
    console.log("AUTRE FIN DU SCRIPT")
    process.exit()
})