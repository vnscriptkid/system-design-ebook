import { Kafka } from 'kafkajs'

export const kafka = new Kafka({
  clientId: 'js-client',
  brokers: ['localhost:9091', 'localhost:9092', 'localhost:9093'],
})

export const TOPIC = 'events'
