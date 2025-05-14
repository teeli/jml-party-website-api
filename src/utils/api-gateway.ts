import { APIGatewayProxyResult } from 'aws-lambda'

export const jsonResponse = <T>(
  body: T,
  statusCode: number = 200,
): APIGatewayProxyResult => ({
  body: JSON.stringify(body),
  statusCode,
  headers: {
    'Content-Type': 'application/json',
  },
})
