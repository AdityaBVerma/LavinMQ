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
    await channel.exchangeDeclare("test_ex1", 'direct',{durable:false});
    await channel.queue('test2', {durable: true})
    // channel.publish('test-ex', 'info', Buffer.from(msg));
    // channel.queueBind("test1", "test-ex", "");

    //Publish a message to the exchange
    async function sendToQueue(exchange, routingKey, body) {
    await channel.basicPublish(exchange, routingKey, body, {deliveryMode: 2})
    console.log("[📥] Message sent to queue", body)
    }

    //Send some messages to the queue
    sendToQueue("test_ex1","test2", "Hi Tejash", );
    sendToQueue("test_ex1","test2", "hope you are doing well");
    sendToQueue("test_ex1","wrong_routing_key", "Hello World");

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