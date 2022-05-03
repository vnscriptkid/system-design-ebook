import { Kafka, Message } from 'kafkajs'

export const produce = async (kafka: Kafka, topic: string, message: Message) => {
  const producer = kafka.producer()

  await producer.connect()

  console.log(`^^ producer connected`)

  const metaData = await producer.send({
    topic,
    messages: [message],
  })

  console.log(`^^ msg produced`, metaData)
}
