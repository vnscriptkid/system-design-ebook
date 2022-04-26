import express, { Request, Response } from 'express'
import { collections } from './db'

export const gamesRouter = express.Router()

gamesRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const games = (await collections.games!.find({}).toArray()) as any[]

    res.status(200).send(games)
  } catch (error) {
    res.status(500).send('oops')
  }
})

gamesRouter.post('/', async (_req: Request, res: Response) => {
  try {

    const {name, numOfPlayers, numOfTeams, requireAge} = _req.body;

    const game = await collections.games?.insertOne({
      name,
      numOfPlayers,
      numOfTeams,
      requireAge
    })
    
    res.status(200).send(game)
  } catch (error) {
    res.status(500).send('oops')
  }
})