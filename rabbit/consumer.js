const amqp = require("amqplib/callback_api")

amqp.connect("amqp://localhost", (err, conn) => {
    
    conn.createChannel((err, channel) => {
        const nameChannel = "hello"
        
        channel.assertQueue(nameChannel, { durable: false })
        channel.consume(nameChannel, message => {
            console.log("On a trouvé un message %s", message.content.toString())
        })
    })


})