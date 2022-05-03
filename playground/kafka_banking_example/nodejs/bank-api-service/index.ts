import { Kafka } from 'kafkajs'
import { IncommingTransactions } from './IncommingTransactions'
import { produce } from './producer'
import { UserDB } from './UserDB'

console.log('bank api service')

export const kafka = new Kafka({
  clientId: 'bank-api-service',
  brokers: ['localhost:9091', 'localhost:9092', 'localhost:9093'],
})

export const TOPICS = {
  validTransactions: 'valid-transactions',
  suspiciousTransactions: 'suspicious-transactions',
}

async function start() {
  const incommingTransactions = await IncommingTransactions.init()

  for await (let transaction of incommingTransactions) {
    // process this transaction
    const originalResidence = await UserDB.getResidence(transaction.username)

    if (originalResidence === transaction.sentFrom) {
      console.log(`^^ valid transaction`)
      await produce(kafka, TOPICS.validTransactions, {
        value: JSON.stringify(transaction),
      })
    } else {
      console.log(`!! suspicious transaction`)
      await produce(kafka, TOPICS.suspiciousTransactions, {
        value: JSON.stringify(transaction),
      })
    }
  }
}

start()
