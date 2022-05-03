import { waitFor } from './utils'
import * as readline from 'readline'
import * as fs from 'fs'

export class UserDB {
  static async getResidence(username: string) {
    await waitFor(500)
    const users = await this.fetchUsers()

    return users.find(u => u.username.toLowerCase() === username.toLowerCase())?.residence;
  }

  static async fetchUsers(): Promise<User[]> {
    const fileStream = fs.createReadStream('./data/user-residence.txt')

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    })
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.

    const users: User[] = [];

    for await (const line of rl) {
      // Each line in input.txt will be successively available here as `line`.
      const [username, residence] = line.split(' ')
      const user = new User(username, residence)
      users.push(user);
    }

    return users;
  }
}

export class User {
  username: string
  residence: string

  constructor(username: string, residence: string) {
    this.username = username
    this.residence = residence
  }
}
