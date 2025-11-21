import amqp from 'amqplib'

const url = 'amqp://localhost'
async function sendEmail(headers, data) {
   try {
     const connection = await amqp.connect(url)
     const channel = await connection.createChannel()
 
     const exchange = 'header_exchance'
     const exchangeType = "headers"
 
     await channel.assertExchange(exchange, exchangeType, {durable: true})
    
 
     const message = JSON.stringify(data)
     channel.publish(exchange, "", Buffer.from(message), {headers})
     console.log("Data is sent : ", data)
 
     await channel.close()
     await connection.close()

   } catch (error) {
    console.log("Error in sending mail : ", error)
   }
}

sendEmail({ "x-match" : "all", "notification-type": "new_video", "content-type" : "video"}, "New video uploaded")
sendEmail({ "x-match" : "all", "notification-type": "live_stream", "content-type" : "gaming"}, "Gaming live stream started")
sendEmail({ "x-match" : "any", "notification-type": "like", "content-type" : "vlog"}, "Some one like your video")
// sendEmail("payment.proccessed", {paymentId : Date.now(), total : "680000- PKR", quntaty : "2"})