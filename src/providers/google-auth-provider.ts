import { SSMClient, GetParameterCommand } from '@aws-sdk/client-ssm'
import { JWTInput } from 'google-auth-library/build/src/auth/credentials'

const ssmClient = new SSMClient({ region: 'eu-west-1' })

const getParameter = async (name: string): Promise<string> => {
  const input = {
    // GetParameterRequest
    Name: name,
    WithDecryption: true,
  }
  const command = new GetParameterCommand(input)
  const value = await ssmClient.send(command)
  return value.Parameter.Value
}

export const getGoogleCredentials = async (): Promise<JWTInput> => {
  const [type, projectId, privateKeyId, privateKey, clientEmail, clientId] =
    await Promise.all([
      getParameter(process.env.GOOGLE_AUTH_TYPE),
      getParameter(process.env.GOOGLE_AUTH_PROJECT_ID),
      getParameter(process.env.GOOGLE_AUTH_PRIVATE_KEY_ID),
      getParameter(process.env.GOOGLE_AUTH_PRIVATE_KEY),
      getParameter(process.env.GOOGLE_AUTH_CLIENT_EMAIL),
      getParameter(process.env.GOOGLE_AUTH_CLIENT_ID),
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
