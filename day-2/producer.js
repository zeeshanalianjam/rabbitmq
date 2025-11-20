import amqp from 'amqplib'

const url = 'amqp://localhost'
async function sendEmail() {
   try {
     const connection = await amqp.connect(url)
     const channel = await connection.createChannel()
 
     const exchange = 'mail_exchange'
     const exchangeType = "direct"
     const routingKey = ['send_mail_subscibed_users', 'send_mail_normal_users']
     const queue = ['subscribed_users', 'normal_users']
 
     const data = {
         to : "farhan@gmail.com",
         from : "zeeshan@gmail.com",
         subject : "Greeting Mail!",
         body : "Hey, Good Morning, whatsup broo, how can i help you."
     }
 
 
     await channel.assertExchange(exchange, exchangeType, {durable: true})
     await channel.assertQueue(queue[1], {durable: true})
 
     await channel.bindQueue(queue[1], exchange, routingKey[1])
 
     const message = JSON.stringify(data)
     channel.publish(exchange, routingKey[1], Buffer.from(message))
     console.log("Data is sent : ", data)
 
     await channel.close()
     await connection.close()

   } catch (error) {
    console.log("Error in sending mail : ", error)
   }
}

sendEmail()