import { Client } from 'pg'
import { faker } from '@faker-js/faker'

async function run() {
  const client = new Client({
    user: 'postgres',
    database: 'thanh',
    host: 'localhost',
    password: '123456',
    port: 5432,
  })

  try {
    await client.connect()
    const res = await client.query('SELECT NOW();')
    console.log(`NOW: ${res.rows[0].now}`)
  } catch (e) {
    console.log(`!! oops, `, e)
  }

  //   await client.query(`DROP DATABASE IF EXISTS thanh;`)
  //   await client.query(`CREATE DATABASE thanh;`)
  const { rows: rows1 } = await client.query(`SELECT session_user, current_database();`)
  console.table(rows1)

  await client.query(`drop table if exists users;`)
  await client.query(`create table users (id serial primary key, first_name varchar, last_name varchar);`)
  //   process.exit(0)

  const promises = []

  for (let _ of Array(1000)) {
    const p = client.query({
      text: `insert into users (first_name, last_name) values ($1, $2);`,
      values: [faker.name.firstName(), faker.name.lastName()],
    })
    promises.push(p)
  }

  await Promise.all(promises)
}

run()
