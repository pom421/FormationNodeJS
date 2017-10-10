var amqp = require('amqplib/callback_api');

var message = process.argv[2]

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'hello';

    ch.assertQueue(q, {durable: false});
    // Note: on Node 6 Buffer.from(msg) should be used
    ch.sendToQueue(q, new Buffer(message));
    console.log(" [x] Sent %s", message);
  });
  setTimeout(function() { conn.close(); process.exit(0) }, 500);
});