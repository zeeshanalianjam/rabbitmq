import amqp from 'amqplib'

const url = 'amqp://localhost'
async function sendEmail(data) {
   try {
     const connection = await amqp.connect(url)
     const channel = await connection.createChannel()
 
     const exchange = 'new_product_laucnh'
     const exchangeType = "fanout"
 
     await channel.assertExchange(exchange, exchangeType, {durable: true})
    
 
     const message = JSON.stringify(data)
     channel.publish(exchange, "", Buffer.from(message))
     console.log("Data is sent : ", data)
 
     await channel.close()
     await connection.close()

   } catch (error) {
    console.log("Error in sending mail : ", error)
   }
}

sendEmail({ name : "Iphone 15 Prox Max",  status : "Launched"})
// sendEmail("payment.proccessed", {paymentId : Date.now(), total : "680000- PKR", quntaty : "2"})