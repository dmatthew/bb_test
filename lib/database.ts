import { Client } from 'pg'

export function getDBClient() {
  const sslConfig =
    process.env.NODE_ENV === 'development'
      ? undefined //SSL not currently configured in local development
      : { rejectUnauthorized: false }
  const client = new Client({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASS,
    port: parseInt(process.env.DATABASE_PORT),
    ssl: sslConfig,
  })
  client.connect()
  return client
}
