const config = require("./config.json")
const mysql = require("mysql")
const express = require("express")
const app = express()

console.log("ENV = ", app.get("env"))

let connection

function connectDatabase() {
    connection = mysql.createConnection(config[app.get("env")])
    connection.connect()
}

exports.allUsers = function allUsers(cb) {
    connectDatabase()
    
    connection.query("select * from users", function(err, result) {
        connection.end()

        if (err) {
            cb(err)
        } else {
            console.log("on trouve", JSON.stringify(result))
    
            cb(null, result)

        }
    })
 
}

exports.addUser = function addUser(user, cb) {
    connectDatabase()

    connection.query("insert into users set ?", user, (err, result) => {
        connection.end()

        if (err) {
            cb(err)
        } else {
            cb(null, result)
        }
    })
}