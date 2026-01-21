import { APIGatewayProxyEventHeaders, Context } from 'aws-lambda'
import { describe, it, vi } from 'vitest'

import { parties } from '../config/parties'
import { PartyID } from '../types/parties'

import {
  handler,
  VisitorsAPIGatewayProxyEvent,
  VisitorsAPIGatewayProxyEventPathParameters,
} from './visitors'

vi.stubEnv('GOOGLE_AUTH_TYPE', '/jmlparty-api/google-auth/type')
vi.stubEnv('GOOGLE_AUTH_PROJECT_ID', '/jmlparty-api/google-auth/project_id')
vi.stubEnv(
  'GOOGLE_AUTH_PRIVATE_KEY_ID',
  '/jmlparty-api/google-auth/private_key_id',
)
vi.stubEnv('GOOGLE_AUTH_PRIVATE_KEY', '/jmlparty-api/google-auth/private_key')
vi.stubEnv('GOOGLE_AUTH_CLIENT_EMAIL', '/jmlparty-api/google-auth/client_email')
vi.stubEnv('GOOGLE_AUTH_CLIENT_ID', '/jmlparty-api/google-auth/client_id')

const dummyContext = {} as unknown as Context

const availableParties = Object.keys(parties) as PartyID[]
const enabledParties = availableParties.filter((p) => parties[p].enabled)
const disabledParties = availableParties.filter((p) => !parties[p].enabled)

const createEvent = (
  party: VisitorsAPIGatewayProxyEventPathParameters['party'] = undefined,
  headers: APIGatewayProxyEventHeaders = {},
): VisitorsAPIGatewayProxyEvent =>
  ({
    pathParameters: {
      party,
    },
    headers,
  }) as unknown as VisitorsAPIGatewayProxyEvent

describe('visitors', () => {
  it('should return a list of visitors for default party', async ({
    expect,
  }) => {
    const response = await handler(createEvent(), dummyContext)
    expect(response.statusCode).toEqual(200)
    expect(response.headers).toEqual(
      expect.objectContaining({
        'Access-Control-Allow-Origin': 'https://jml.party',
        'Content-Type': 'application/json',
      }),
    )

    const body = JSON.parse(response.body)
    expect(body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          handle: expect.any(String),
          group: expect.any(String),
          hidden: expect.any(Boolean),
        }),
      ]),
    )
  })

  it.for(enabledParties)(
    'should return a list of visitors for enabled party %s',
    async (party, { expect }) => {
      const response = await handler(
        createEvent(party, { Origin: parties[party].domains[0] }),
        dummyContext,
      )
      expect(response.statusCode).toEqual(200)
      expect(response.headers).toEqual(
        expect.objectContaining({
          'Access-Control-Allow-Origin': parties[party].domains[0],
          'Content-Type': 'application/json',
        }),
      )

      const body = JSON.parse(response.body)
      expect(body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            handle: expect.any(String),
            group: expect.any(String),
            hidden: expect.any(Boolean),
          }),
        ]),
      )
    },
  )

  it.for(disabledParties)(
    'should not return a list of visitors for disabled party %s',
    async (party, { expect }) => {
      const response = await handler(createEvent(party), dummyContext)
      expect(response.statusCode).toEqual(200)
      expect(response.headers).toEqual(
        expect.objectContaining({
          'Access-Control-Allow-Origin': 'https://jml.party',
          'Content-Type': 'application/json',
        }),
      )

      const body = JSON.parse(response.body)
      expect(body.length).toEqual(0)
    },
  )

  it('should return 404 for non-existing party', async ({ expect }) => {
    const response = await handler(
      createEvent('thispartydoesnotexist' as PartyID),
      dummyContext,
    )
    expect(response.statusCode).toEqual(404)
  })
})
