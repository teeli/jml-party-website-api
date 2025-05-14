import { describe, it } from 'vitest'

import { parties } from '../config/parties'

import { DEFAULT_ORIGIN, getCorsOrigin } from './cors'

const partyOrigins = Object.values(parties).flatMap((party) =>
  party.domains.map((origin) => origin.toString()),
)

describe('cors util', () => {
  it.for([
    'http://localhost:3000',
    'https://jmlparty-website-git-feat-2025-teaser-teelis-projects.vercel.app',
  ])('should allow default origin %s', (url, { expect }) => {
    const response = getCorsOrigin(url)
    expect(response).toEqual(url)
  })

  it.for(partyOrigins)('should allow party origin %s', (url, { expect }) => {
    const response = getCorsOrigin(url)
    expect(response).toEqual(url)
  })

  it.for(['https://random.vercel.app', 'https://jrnl.party'])(
    'should not allow evil origin %s',
    (url, { expect }) => {
      const response = getCorsOrigin(url)
      expect(response).toEqual(DEFAULT_ORIGIN)
    },
  )
})
