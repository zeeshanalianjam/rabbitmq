import amqp from 'amqplib'

const url = 'amqp://localhost'
async function sendEmail() {
   try {
     const connection = await amqp.connect(url)
     const channel = await connection.createChannel()
 
     const exchange = 'mail_exchange'
     const exchangeType = "direct"
     const routingKey = 'send_email'
     const queue = 'mail_queue'
 
     const data = {
         to : "farhan@gmail.com",
         from : "zeeshan@gmail.com",
         subject : "Greeting Mail!",
         body : "Hey, Good Morning, whatsup broo, how can i help you."
     }
 
 
     await channel.assertExchange(exchange, exchangeType, {durable: true})
     await channel.assertQueue(queue, {durable: true})
 
     await channel.bindQueue(queue, exchange, routingKey)
 
     const message = JSON.stringify(data)
     channel.publish(exchange, routingKey, Buffer.from(message))
     console.log("Data is sent : ", data)
 
     await channel.close()
     await connection.close()

   } catch (error) {
    console.log("Error in sending mail : ", error)
   }
}

sendEmail()