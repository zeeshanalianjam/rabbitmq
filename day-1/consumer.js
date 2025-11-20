import amqp from 'amqplib'

const url = 'amqp://localhost'
async function receiveEmail(){
      const connection = await amqp.connect(url)
         const channel = await connection.createChannel()
     
         const queue = 'mail_queue'

         await channel.assertQueue(queue, {durable : true})

         console.log("Waiting for Response!")
         channel.consume(queue, (message) => {
            if(message != null){
                const data = JSON.parse(message.content)
                console.log("Received data : ", data)
                channel.ack(message)
            }
         })
}

receiveEmail()