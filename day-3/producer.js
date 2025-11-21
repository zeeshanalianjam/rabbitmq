import amqp from 'amqplib'

const url = 'amqp://localhost'
async function sendEmail(routingKey, data) {
   try {
     const connection = await amqp.connect(url)
     const channel = await connection.createChannel()
 
     const exchange = 'notificaton_exchange'
     const exchangeType = "topic"
 
     await channel.assertExchange(exchange, exchangeType, {durable: true})
    
 
     const message = JSON.stringify(data)
     channel.publish(exchange, routingKey, Buffer.from(message))
     console.log("Data is sent : ", data)
 
     await channel.close()
     await connection.close()

   } catch (error) {
    console.log("Error in sending mail : ", error)
   }
}

sendEmail("order.placed", {orderId : Date.now(), name : "Iphone 15 Prox Max", quntaty : "2" , price : "340000- PKR"})
sendEmail("payment.proccessed", {paymentId : Date.now(), total : "680000- PKR", quntaty : "2"})