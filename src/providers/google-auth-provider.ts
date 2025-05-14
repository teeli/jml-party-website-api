import { SSMClient, GetParameterCommand } from '@aws-sdk/client-ssm'
import { JWTInput } from 'google-auth-library/build/src/auth/credentials'

import { getEnvironment } from '../config/environment'

const ssmClient = new SSMClient({ region: 'eu-west-1' })

const getParameter = async (name: string): Promise<string | undefined> => {
  const input = {
    // GetParameterRequest
    Name: name,
    WithDecryption: true,
  }
  const command = new GetParameterCommand(input)
  const value = await ssmClient.send(command)
  return value.Parameter?.Value
}

export const getGoogleCredentials = async (): Promise<JWTInput> => {
  const [type, projectId, privateKeyId, privateKey, clientEmail, clientId] =
    await Promise.all([
      getParameter(getEnvironment('GOOGLE_AUTH_TYPE')),
      getParameter(getEnvironment('GOOGLE_AUTH_PROJECT_ID')),
      getParameter(getEnvironment('GOOGLE_AUTH_PRIVATE_KEY_ID')),
      getParameter(getEnvironment('GOOGLE_AUTH_PRIVATE_KEY')),
      getParameter(getEnvironment('GOOGLE_AUTH_CLIENT_EMAIL')),
      getParameter(getEnvironment('GOOGLE_AUTH_CLIENT_ID')),
    ])
  const universeDomain = 'googleapis.com'
  return {
    type: type,
    project_id: projectId,
    private_key_id: privateKeyId,
    private_key: privateKey,
    client_email: clientEmail,
    client_id: clientId,
    universe_domain: universeDomain,
  }
}
