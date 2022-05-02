import { kafka, TOPIC } from './config'
import { createTopic } from './create-topic'
import { produce } from './producer'

async function start() {
  try {
    await createTopic(kafka, TOPIC)

    await produce(kafka, TOPIC)
  } catch (err) {
  } finally {
    process.exit(0)
  }
}

start()
