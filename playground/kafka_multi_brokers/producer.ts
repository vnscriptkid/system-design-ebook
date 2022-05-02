import { Kafka } from 'kafkajs'

// we define an async function that writes a new message each second
export const produce = async (kafka: Kafka, topic) => {
  const producer = kafka.producer()

  await producer.connect()

  let i = 0

  while (true) {
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
    i++

    await waitFor(2000)
  }
}
function waitFor(ms: number) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('DONE')
    }, ms)
  })
}
