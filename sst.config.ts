/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path=".sst/platform/config.d.ts" />

const defaultEnvironment = {
  GOOGLE_AUTH_TYPE: '/jmlparty-api/google-auth/type',
  GOOGLE_AUTH_PROJECT_ID: '/jmlparty-api/google-auth/project_id',
  GOOGLE_AUTH_PRIVATE_KEY_ID: '/jmlparty-api/google-auth/private_key_id',
  GOOGLE_AUTH_PRIVATE_KEY: '/jmlparty-api/google-auth/private_key',
  GOOGLE_AUTH_CLIENT_EMAIL: '/jmlparty-api/google-auth/client_email',
  GOOGLE_AUTH_CLIENT_ID: '/jmlparty-api/google-auth/client_id',
}

export default $config({
  // Your app's config
  app(_input) {
    return {
      name: 'jmlparty-api',
      home: 'aws',
      providers: {
        aws: { region: 'eu-west-1' },
      },
    }
  },
  // Your app's resources
  async run() {
    const getRegionOutput = await aws.getRegion()
    const getCallerIdentityOutput = await aws.getCallerIdentity()
    const region = getRegionOutput.name
    const account = getCallerIdentityOutput.accountId
    const visitorsArguments = {
      handler: 'src/functions/visitors.handler',
      environment: defaultEnvironment,
      description: 'jmlparty-api visitors endpoint handler',
      timeout: '10 seconds',
      memory: '512 MB',
      permissions: [
        {
          actions: ['ssm:GetParameter*'],
          resources: [
            `arn:aws:ssm:${region}:${account}:parameter/jmlparty-api/google-auth/*`,
          ],
        },
      ],
    }
    // TODO: define domain
    const api = new sst.aws.ApiGatewayV2('jmlparty-api', {
      cors: {
        allowMethods: ['GET'],
        allowHeaders: ['*'],
        allowOrigins: ['*'],
      },
    })
    api.route('GET /visitors', visitorsArguments)
    api.route('GET /visitors/{party}', visitorsArguments)
  },
})
