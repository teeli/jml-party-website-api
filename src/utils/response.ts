import { addSeconds, formatRFC7231 } from 'date-fns'

const DEFAULT_TTL = 300

export const generateResponse = (
  body: string,
  statusCode: number = 200,
  customHeaders?: Record<string, string>,
) => ({
  statusCode,
  body,
  headers: {
    Expires: formatRFC7231(addSeconds(new Date(), DEFAULT_TTL)),
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': 'OPTIONS,GET',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': `public, max-age=${DEFAULT_TTL}, s-maxage=${DEFAULT_TTL}, proxy-revalidate`,
    ...customHeaders,
  },
})
