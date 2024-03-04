import { google, Auth } from 'googleapis'

import { getGoogleCredentials } from '../providers/google-auth-provider'

google.options({
  http2: true,
})

async function authSheets() {
  const credentials = await getGoogleCredentials()

  const auth: Auth.GoogleAuth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
  const authClient = await auth.getClient()
  const sheets = google.sheets({ version: 'v4', auth })

  return {
    auth,
    authClient,
    sheets,
  }
}

export async function getSpreadSheet(parameters: {
  spreadsheetId?: string
  range?: string
}) {
  const { sheets } = await authSheets()

  // Read rows from spreadsheet
  return await sheets.spreadsheets.values.get(parameters)
}
