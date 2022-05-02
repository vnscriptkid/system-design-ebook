import { Kafka } from 'kafkajs'
import { createTopic } from './create-topic'
import { produce } from './producer'

async function start() {
  const kafka = new Kafka({
    clientId: 'js-client',
    brokers: ['localhost:9091', 'localhost:9092', 'localhost:9093'],
  })

  const TOPIC = 'events'

  try {
    await createTopic(kafka, TOPIC)

    await produce(kafka, TOPIC)
  } catch (err) {
  } finally {
    process.exit(0)
  }
}

start()
