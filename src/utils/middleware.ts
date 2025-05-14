import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import httpSecurityHeaders from '@middy/http-security-headers'
import httpEventNormalizer from '@middy/http-event-normalizer'
import httpHeaderNormalizer from '@middy/http-header-normalizer'

import { DEFAULT_ORIGIN, getCorsOrigin } from './cors'

export const defaultMiddlewares = () => [
  httpHeaderNormalizer(),
  httpEventNormalizer(),
  httpErrorHandler(),
  httpSecurityHeaders(),
  cors({
    getOrigin: getCorsOrigin,
    origin: DEFAULT_ORIGIN,
  }),
]
