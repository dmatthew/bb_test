import * as redis from 'redis'

export function getRedisClient() {
  const client = redis.createClient({
    url: process.env.REDIS_URI
  })

  client.on('ready', () => {
    console.log('redis is connected')
  })
  client.on('error', err => {
    console.log('Error ' + err)
  })
  return client
}

export async function getCachedValue(key: string): Promise<string> {
  const redisClient = getRedisClient()
  await redisClient.connect()
  const value = await redisClient.get(key);
  redisClient.quit()
  return value
}

export async function setCacheValue(key: string, value: string) {
  const redisClient = getRedisClient()
  await redisClient.connect()
  await redisClient.set(key, value)
  redisClient.quit()
}
