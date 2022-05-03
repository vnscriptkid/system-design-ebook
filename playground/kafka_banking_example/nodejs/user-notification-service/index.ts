import { TOPICS } from '../shared/constants'
import { consume } from '../shared/consumer'
import { Transaction } from '../shared/models'
import { buildKafkaClient } from '../shared/utils'

async function start() {
  const kafka = buildKafkaClient(`user-notif-service`)

  consume(kafka, `user-notif-service`, TOPICS.suspiciousTransactions, async msg => {
    const transaction = <Transaction>JSON.parse(msg.value.toString('utf8'))

    sendNotif(transaction)
  })
}

function sendNotif(transaction: Transaction) {
  console.log(`@@ notifying ${transaction.username} about potentially malicious action.`)
}

start()
