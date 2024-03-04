export const generateResponse = (body: string, statusCode: number = 200) => {
  return {
    statusCode,
    body,
  }
}
