import amqp from 'amqplib'

const url = 'amqp://localhost'
async function receiveEmail() {
   const connection = await amqp.connect(url)
   const channel = await connection.createChannel()

   const exchange = 'header_exchance'
     const exchangeType = "headers"

   await channel.assertExchange(exchange, exchangeType, { durable: true })

   const q = await channel.assertQueue("", { exclusive: true })
   console.log("waiting for queues ==> ", q)

   await channel.bindQueue(q.queue, exchange, "", {
      "x-match" : "all", "notification-type": "new_video", "content-type" : "video"
   })

   console.log("Waiting for Response!")
   channel.consume(q.queue, (message) => {
      if (message != null) {
         const data = JSON.parse(message.content)
         console.log("[Video Notification ==>] sending successfully : ", data)
         channel.ack(message)
      }
   })
}

receiveEmail()