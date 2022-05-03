import { Kafka } from 'kafkajs'
import { createTopic } from './create-topic'

export const kafka = new Kafka({
  clientId: 'js-client',
  brokers: ['localhost:9091', 'localhost:9092', 'localhost:9093'],
})

export const TOPICS = {
  validTransactions: 'valid-transactions',
  suspiciousTransactions: 'suspicious-transactions',
}

async function start() {
  //   await createBankingTopics()
}

start()

async function createBankingTopics() {
  await createTopic({
    kafka,
    topic: TOPICS.validTransactions,
    numPartitions: 3,
    replicationFactor: 3,
  })
  await createTopic({
    kafka,
    topic: TOPICS.suspiciousTransactions,
    numPartitions: 2,
    replicationFactor: 3,
  })
}
