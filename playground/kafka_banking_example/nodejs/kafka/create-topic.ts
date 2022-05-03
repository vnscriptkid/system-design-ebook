import { Kafka } from 'kafkajs'

interface Props {
  kafka: Kafka
  topic: string
  numPartitions: number
  replicationFactor: number
}

export const createTopic = async ({ kafka, topic, numPartitions, replicationFactor }: Props) => {
  try {
    const admin = kafka.admin()

    console.log(`@@ connecting...`)
    await admin.connect()
    console.log(`^^ connected`)

    await admin.createTopics({
      topics: [
        {
          topic,
          numPartitions,
          replicationFactor,
        },
      ],
    })

    console.log(`^^ done creating topic ${topic}`)
  } catch (err) {
    console.log(`!! err while creating topic`, err)
    throw err
  }
}
