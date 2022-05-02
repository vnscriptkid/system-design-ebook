import { Kafka } from 'kafkajs'

export const createTopic = async (kafka: Kafka, topic: string) => {
  try {
    const admin = kafka.admin()
    console.log(`@@ connecting...`)
    await admin.connect()
    console.log(`^^ connected`)

    await admin.createTopics({
      topics: [
        {
          topic,
          numPartitions: 3,
          replicationFactor: 2,
        },
      ],
    })

    console.log(`^^ done creating topic ${topic}`)
  } catch (err) {
    console.log(`!! err while creating topic`, err)
    throw err
  }
}
