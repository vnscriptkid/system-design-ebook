import { Kafka } from 'kafkajs'
import { kafka, TOPIC } from './config'

const args = process.argv.slice(2)
const [consumerGroup] = args

export const consume = async (kafka: Kafka, consumerGroup: string, topic: string) => {
  console.log(`[${consumerGroup}] started`)
  const consumer = kafka.consumer({ groupId: consumerGroup })

  await consumer.connect()
  await consumer.subscribe({ topic /*fromBeginning: true*/ })
  await consumer.run({
    eachMessage: async ({ message, topic, partition }) => {
      console.log(`[${topic}<=${consumerGroup}] received message: ${message.value}`)
      await consumer.commitOffsets([{ topic, partition, offset: (Number(message.offset) + 1).toString() }])
    },
    autoCommit: false,
  })
}

consume(kafka, consumerGroup, TOPIC)
