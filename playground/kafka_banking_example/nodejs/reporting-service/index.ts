import { TOPICS } from '../shared/constants'
import { consume, consumeMultiple } from '../shared/consumer'
import { Transaction } from '../shared/models'
import { buildKafkaClient } from '../shared/utils'

async function start() {
  const kafka = buildKafkaClient(`reporting-service`)

  consumeMultiple(
    kafka,
    `reporting-service`,
    [TOPICS.validTransactions, TOPICS.suspiciousTransactions],
    async (msg, topic) => {
      const transaction = <Transaction>JSON.parse(msg.value.toString('utf8'))

      recordTransaction(transaction, topic)
    }
  )
}

function recordTransaction(transaction: Transaction, topic: string) {
  if (topic === TOPICS.validTransactions) {
    console.log(`@@ recording valid trans`, transaction)
  } else if (topic === TOPICS.suspiciousTransactions) {
    console.log(`@@ recording suspicious trans`, transaction)
  } else {
    console.log(`!!oops`)
  }
}
start()
