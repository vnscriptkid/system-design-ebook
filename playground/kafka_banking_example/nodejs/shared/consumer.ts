import { Kafka, KafkaMessage } from 'kafkajs'

export const consume = async (
  kafka: Kafka,
  consumerGroup: string,
  topic: string,
  messageConsumer: (msg: any, topic: any) => Promise<void>
) => {
  //   console.log(`[${consumerGroup}] started`)
  const consumer = kafka.consumer({ groupId: consumerGroup })

  await consumer.connect()
  await consumer.subscribe({ topic })
  await consumer.run({
    eachMessage: async ({ message, topic, partition }) => {
      //   console.log(`[${topic}<=${consumerGroup}] received message: ${message.value}`)
      await messageConsumer(message, topic)
      await consumer.commitOffsets([{ topic, partition, offset: (Number(message.offset) + 1).toString() }])
    },
    autoCommit: false,
  })
}

export const consumeMultiple = async (
  kafka: Kafka,
  consumerGroup: string,
  topics: string[],
  messageConsumer: (msg: any, topic: any) => Promise<void>
) => {
  //   console.log(`[${consumerGroup}] started`)
  const consumer = kafka.consumer({ groupId: consumerGroup })

  await consumer.connect()
  for (let topic of topics) {
    await consumer.subscribe({ topic })
  }
  await consumer.run({
    eachMessage: async ({ message, topic, partition }) => {
      //   console.log(`[${topic}<=${consumerGroup}] received message: ${message.value}`)
      await messageConsumer(message, topic)
      await consumer.commitOffsets([{ topic, partition, offset: (Number(message.offset) + 1).toString() }])
    },
    autoCommit: false,
  })
}
