import { Kafka } from 'kafkajs'

// we define an async function that writes a new message each second
export const produce = async (kafka: Kafka, topic) => {
  const producer = kafka.producer()

  await producer.connect()

  for (let i = 0; i < 10; i++) {
    const metaData = await producer.send({
      topic,
      messages: [
        {
          key: `${i}`,
          value: `event ${i}`,
          //   timestamp: ???
          // partition: 0,
        },
      ],
    })
    console.log(`Produced msg: `, metaData)
  }
}
