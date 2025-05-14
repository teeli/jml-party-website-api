export const getEnvironment = <T>(key: string): T => {
  if (process.env[key]) {
    return process.env[key] as T
  }

  throw new Error('Environment variable is not defined')
}
