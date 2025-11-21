import amqp from 'amqplib'

const url = 'amqp://localhost'
async function receiveEmail() {
   const connection = await amqp.connect(url)
   const channel = await connection.createChannel()

   const exchange = 'new_product_laucnh'
     const exchangeType = "fanout"

   await channel.assertExchange(exchange, exchangeType, { durable: true })

   const q = await channel.assertQueue("", { exclusive: true })
   console.log("waiting for queues ==> ", q)

   await channel.bindQueue(q.queue, exchange, "")

   console.log("Waiting for Response!")
   channel.consume(q.queue, (message) => {
      if (message != null) {
         const data = JSON.parse(message.content)
         console.log("[Sms Notification ==>] sending successfully : ", data)
         channel.ack(message)
      }
   })
}

receiveEmail()