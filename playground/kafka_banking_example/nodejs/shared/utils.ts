import { Kafka } from 'kafkajs'

export function buildKafkaClient(clientId: string): Kafka {
  const kafka = new Kafka({
    clientId,
    brokers: ['localhost:9091', 'localhost:9092', 'localhost:9093'],
  })

  return kafka
}
