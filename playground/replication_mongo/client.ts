import express, { Request, Response } from 'express'
import { connectToDatabase } from './db'
import { gamesRouter } from './gameRouter'

const app = express()

connectToDatabase()
  .then(() => {
    app.use(express.json())

    app.use('/games', gamesRouter)

    const port = 8083

    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`)
    })
  })
  .catch((error: Error) => {
    console.error('Database connection failed', error)
    process.exit()
  })
