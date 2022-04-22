import { Client } from 'pg'

function getClient() {
  const sslConfig =
    process.env.NODE_ENV === 'development'
      ? undefined //SSL not currently configured in local development
      : { rejectUnauthorized: false }
  return new Client({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASS,
    port: parseInt(process.env.DATABASE_PORT),
    ssl: sslConfig,
  })
}

export async function createGuid(guid: string, user: string): Promise<any> {
  if (!guid || !user) return null;

  const client = getClient()
  await client.connect()
  const { rows } = await client.query(
    `
    INSERT INTO guids ("guid", "user")
    VALUES ($1, $2)
    ON CONFLICT DO NOTHING
    RETURNING "guid", "user"
  `,
    [guid, user]
  )
  await client.end()
  if (rows.length) {
    return {
      guid: rows[0].guid,
      user: rows[0].user,
    }
  }

  return null
}

export async function getGuid(guid: string): Promise<any> {
  if (!guid) return null;

  const client = getClient()
  await client.connect()
  const { rows } = await client.query(
    `
    SELECT * FROM guids WHERE guid = $1
  `,
    [guid]
  )
  await client.end()
  if (rows.length) {
    return {
      guid: rows[0].guid,
      user: rows[0].user,
    }
  }
  return null
}

export async function updateGuid(guid: string, user: string): Promise<any> {
  if (!guid || !user) return null;

  // Update guid in database

  return {guid: guid, user: 'Cylance, Inc.'}
}

export async function deleteGuid(guid: string): Promise<boolean> {
  if (!guid) return false;

  const client = getClient()
  await client.connect()
  const { rowCount } = await client.query(
    `
    DELETE FROM guids WHERE guid = $1
  `,
    [guid]
  )
  await client.end()
  return rowCount > 0
}