import { describe, it, vi } from 'vitest'
import { mockClient } from 'aws-sdk-client-mock'
import {
  SSMClient,
  GetParameterCommandInput,
  GetParameterCommand,
  GetParameterCommandOutput,
} from '@aws-sdk/client-ssm'

import { getGoogleCredentials } from './google-auth-provider'

const ssmMock = mockClient(SSMClient)

vi.stubEnv('GOOGLE_AUTH_TYPE', 'EnvMock:GOOGLE_AUTH_TYPE')
vi.stubEnv('GOOGLE_AUTH_PROJECT_ID', 'EnvMock:GOOGLE_AUTH_PROJECT_ID')
vi.stubEnv('GOOGLE_AUTH_PRIVATE_KEY_ID', 'EnvMock:GOOGLE_AUTH_PRIVATE_KEY_ID')
vi.stubEnv('GOOGLE_AUTH_PRIVATE_KEY', 'EnvMock:GOOGLE_AUTH_PRIVATE_KEY')
vi.stubEnv('GOOGLE_AUTH_CLIENT_EMAIL', 'EnvMock:GOOGLE_AUTH_CLIENT_EMAIL')
vi.stubEnv('GOOGLE_AUTH_CLIENT_ID', 'EnvMock:GOOGLE_AUTH_CLIENT_ID')

describe('GoogleAuthProvider', () => {
  it('should return google auth variables from SSM', async ({ expect }) => {
    ssmMock.on(GetParameterCommand).callsFake(
      (input: GetParameterCommandInput): GetParameterCommandOutput =>
        ({
          Parameter: {
            Value: `SSMmock:${input.Name}`,
          },
        }) as GetParameterCommandOutput,
    )

    const credentials = await getGoogleCredentials()
    expect(credentials).toEqual({
      type: 'SSMmock:EnvMock:GOOGLE_AUTH_TYPE',
      project_id: 'SSMmock:EnvMock:GOOGLE_AUTH_PROJECT_ID',
      private_key_id: 'SSMmock:EnvMock:GOOGLE_AUTH_PRIVATE_KEY_ID',
      private_key: 'SSMmock:EnvMock:GOOGLE_AUTH_PRIVATE_KEY',
      client_email: 'SSMmock:EnvMock:GOOGLE_AUTH_CLIENT_EMAIL',
      client_id: 'SSMmock:EnvMock:GOOGLE_AUTH_CLIENT_ID',
      universe_domain: 'googleapis.com',
    })
  })
})
