export class User {
  username: string
  residence: string

  constructor(username: string, residence: string) {
    this.username = username
    this.residence = residence
  }
}

export class Transaction {
  constructor(public username: string, public sentFrom: string, public amount: number) {}
}
