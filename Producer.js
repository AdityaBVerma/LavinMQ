import { AMQPClient } from '@cloudamqp/amqp-client'
import {} from 'dotenv/config'

const cloudAMQPURL = process.env.CLOUDAMQP_URL

async function startProducer() {
try {
    //Setup a connection to the RabbitMQ server
    const connection = new AMQPClient(cloudAMQPURL)
    await connection.connect()
    const channel = await connection.channel()

    console.log("[✅] Connection over channel established")
    await channel.exchangeDeclare("test_ex5", 'direct',{durable:false});
    await channel.queue('test6', {durable: true})

    //Publish a message to the exchange
    async function sendToQueue(exchange, routingKey, body) {
    await channel.queueBind(routingKey, exchange, routingKey);
    await channel.basicPublish(exchange, routingKey, body, {deliveryMode: 2})
    console.log("[📥] Message sent to queue", body)
    }

    //Send some messages to the queue

    await sendToQueue("test_ex5","test6", "hope you are ");
    await sendToQueue("test_ex5","test6", "aditya ");

    setTimeout(() => {
    //Close the connection
    connection.close()
    console.log("[❎] Connection closed")
    process.exit(0)
    }, 500);
} catch (error) {
    console.error(error)
    //Retry after 3 second
    setTimeout(() => {
    startProducer()
    }, 3000)
}
}

startProducer()