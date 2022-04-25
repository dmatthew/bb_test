import * as redis from 'redis'

export function getRedisClient() {
  const userPassString = process.env.NODE_ENV === 'development'
    ? ''
    : process.env.REDIS_USER + ':' + process.env.REDIS_PASS + '@'
  const client = redis.createClient({
    url: `redis://${userPassString}${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
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
