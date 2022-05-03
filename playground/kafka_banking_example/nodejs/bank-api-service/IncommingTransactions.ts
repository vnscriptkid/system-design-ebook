import { waitFor } from './utils'
import * as readline from 'readline'
import * as fs from 'fs'

export class IncommingTransactions {
  transactions: Transaction[]

  constructor(transactions: Transaction[]) {
    this.transactions = transactions
  }

  static async init() {
    const fileStream = fs.createReadStream('./data/user-transactions.txt')

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    })
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.

    const transactions: Transaction[] = []

    for await (const line of rl) {
      const [username, sentFrom, amount] = line.split(' ')

      transactions.push(new Transaction(username, sentFrom, parseFloat(amount)))
    }

    return new IncommingTransactions(transactions)
  }

  [Symbol.asyncIterator]() {
    let i = 0
    const self = this
    return {
      next: async () => {
        await waitFor(1000)
        return {
          done: i === self.transactions.length,
          value: self.transactions[i++],
        }
      },
    }
  }
}

export class Transaction {
  constructor(public username: string, public sentFrom: string, public amount: number) {}
}
