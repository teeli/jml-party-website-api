import { constants } from 'node:zlib'

import httpContentEncoding from '@middy/http-content-encoding'
import httpContentNegotiation from '@middy/http-content-negotiation'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import httpEventNormalizer from '@middy/http-event-normalizer'
import httpHeaderNormalizer from '@middy/http-header-normalizer'
import httpSecurityHeaders from '@middy/http-security-headers'
import httpResponseSerializer from '@middy/http-response-serializer'

import type { Options } from '@middy/http-cors'

const getOrigin = (incomingOrigin: string, options: Options) => {
  const origins = [
    /^https:\/\/jml.party$/,
    /^https:\/\/.*.vercel.app$/,
    /^http:\/\/localhost:\d*$/,
  ]
  for (const origin of origins) {
    if (origin.test(incomingOrigin)) {
      return incomingOrigin
    }
  }
  return options.origin
}

export const defaultMiddlewares = [
  httpHeaderNormalizer(),
  httpEventNormalizer(),
  httpContentNegotiation({
    parseCharsets: false,
    parseEncodings: false,
    parseLanguages: false,
    availableMediaTypes: ['application/json'],
  }),
  httpResponseSerializer({
    serializers: [
      {
        regex: /^application\/json$/,
        serializer: ({ body }) => JSON.stringify(body),
      },
    ],
    defaultContentType: 'application/json',
  }),
  httpContentEncoding({
    br: {
      params: {
        [constants.BROTLI_PARAM_MODE]: constants.BROTLI_MODE_TEXT, // adjusted for UTF-8 text
        [constants.BROTLI_PARAM_QUALITY]: 7,
      },
    },
    overridePreferredEncoding: ['br', 'gzip', 'deflate'],
  }),
  httpErrorHandler(),
  httpSecurityHeaders(),
  cors({
    getOrigin,
    origin: 'https://jml.party',
  }),
]
