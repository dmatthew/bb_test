import { GuidType } from 'lib/types'
import crypto from 'crypto'
import { getCachedValue, setCacheValue } from 'lib/cache'
import { getDBClient } from 'lib/database'

export async function getAllGuids(): Promise<GuidType[]> {
  const client = getDBClient()
  const { rows } = await client.query(
    `
    SELECT "guid", "user"
    FROM "guids"
    `
  )
  await client.end()
  return rows
}

export async function createGuid(guid: string, user: string): Promise<any> {
  if (!guid || !user) return null;

  const client = getDBClient()
  const { rows } = await client.query(
    `
    INSERT INTO "guids" ("guid", "user")
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

  const cachedValue = await getCachedValue(guid)
  if (cachedValue) {
    return JSON.parse(cachedValue)
  }

  const client = getDBClient()
  const { rows } = await client.query(
    `
    SELECT * FROM "guids" WHERE "guid" = $1
  `,
    [guid]
  )
  await client.end()
  if (rows.length) {
    const result = {
      guid: rows[0].guid,
      user: rows[0].user,
    }
    await setCacheValue(guid, JSON.stringify(result))
    return result
  }
  return null
}

export async function updateGuid(guid: string, user: string): Promise<any> {
  if (!guid || !user) return null;

  const client = getDBClient()
  const { rows } = await client.query(
    `
    UPDATE "guids"
    SET "user" = $1
    WHERE "guid" = $2
    RETURNING "guid", "user"
  `,
    [user, guid]
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

export async function deleteGuid(guid: string): Promise<boolean> {
  if (!guid) return false;

  const client = getDBClient()
  const { rowCount } = await client.query(
    `
    DELETE FROM "guids" WHERE "guid" = $1
  `,
    [guid]
  )
  await client.end()
  return rowCount > 0
}

/**
 * Creates a 32 character hexadecimal string.
 */
export function generateGuid(): string {
  return crypto.randomBytes(16).toString('hex').toUpperCase()
}

/**
 * Checks whether an input string is a valid GUID.
 */
export function isValidGuid(guid: string): boolean {
  return /^[0-9A-F]{32}$/g.test(guid)
}

/**
 * Converts the query input to a string if it is formatted as an array of strings.
 * This application only handles input as a single value.
 */
export function cleanQueryInput(input: string | string[]): string {
  if (Array.isArray(input)) {
    input = input.length > 0 ? input[0] : ''
  }
  return input
}
