const path = require('path')
const util = require('util')
const os = require('os')

console.log("filename", __filename)
console.log("filename", path.basename(__filename))

console.log(path.join(__dirname, "var", "www", "app"))
console.log(util.format("le dossier est : %s", __dirname))

console.log("os réseau", os.networkInterfaces())
console.log("RAM libre %s octets", os.freemem())
console.log("OS constantes", os.constants)