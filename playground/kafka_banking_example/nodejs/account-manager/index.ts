import { TOPICS } from '../shared/constants'
import { consume } from '../shared/consumer'
import { Transaction } from '../shared/models'
import { buildKafkaClient } from '../shared/utils'

async function start() {
  const kafka = buildKafkaClient(`account-manager`)

  consume(kafka, `account-manager`, TOPICS.validTransactions, async msg => {
    const transaction = <Transaction>JSON.parse(msg.value.toString('utf8'))
    approveTransaction(transaction)
  })
}

function approveTransaction(transaction: Transaction) {
  console.log(`^^ approved transaction`, transaction)
}

start()
