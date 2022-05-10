const app = require('express')()
const { Pool } = require('pg')
const { Client } = require('pg')

app.get('/all', async (req, res) => {
  const fromDate = new Date()

  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '123456',
    database: 'thanh',
  })

  //connect
  await client.connect()
  //return all rows
  const results = await client.query('select * from users;')
  //   console.table(results.rows)
  //end
  client.end()

  const toDate = new Date()
  const elapsed = toDate.getTime() - fromDate.getTime()

  //send it to the wire
  res.send({ rows: results.rows, elapsed: elapsed, method: 'old' })
})

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: '123456',
  database: 'thanh',
  max: 20,
  connectionTimeoutMillis: 0, // how long pending reqs will wait to get connection, 0 means forever
  idleTimeoutMillis: 0, // how long a free conn will wait before getting terminated, 0 means forever
})

app.get('/pool', async (req, res) => {
  const fromDate = new Date()

  //return all rows
  const results = await pool.query('select * from users;')
  //   console.table(results.rows)
  console.log(new Date())
  const toDate = new Date()
  const elapsed = toDate.getTime() - fromDate.getTime()

  //send it to the wire
  res.send({ rows: results.rows, elapsed: elapsed, method: 'pool' })
})

app.listen(9000, () => console.log('Listening on port 9000'))
