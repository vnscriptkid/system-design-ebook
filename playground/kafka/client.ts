import { Kafka } from 'kafkajs'

async function start() {
  try {
    const kafka = new Kafka({
      clientId: 'myapp',
      //   brokers: ['localhost:9092'],
      brokers: ['localhost:29092'],
    })

    const admin = kafka.admin()
    console.log(`@@ connecting...`)
    await admin.connect()
    console.log(`^^ connected`)

    await admin.createTopics({
      topics: [
        {
          topic: 'Users',
          numPartitions: 2,
        },
      ],
    })

    console.log(`^^ done creating topic`)
  } catch (err) {
    console.log(`!! oops`, err)
  } finally {
    process.exit(0)
  }
}

start()
