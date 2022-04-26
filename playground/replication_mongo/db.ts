import * as mongoDB from 'mongodb'

const DB_NAME = 'gamesDB'
const DB_CONN_STRING = `mongodb://root:123456@localhost:27017/${DB_NAME}?directConnection=true&authSource=admin&retryWrites=true&w=majority`
const GAMES_COLLECTION_NAME = 'games'

export const collections: { games?: mongoDB.Collection } = {}

export async function connectToDatabase() {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(DB_CONN_STRING)

  await client.connect()

  const db: mongoDB.Db = client.db(DB_NAME)

  const gamesCollection: mongoDB.Collection = db.collection(GAMES_COLLECTION_NAME)

  collections.games = gamesCollection

  console.log(
    `Successfully connected to database: ${db.databaseName} and collection: ${gamesCollection.collectionName}`
  )
}
