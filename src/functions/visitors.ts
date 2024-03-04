import { getSpreadSheet } from '../data-sources/sheets'
import { BaseError } from '../errors/errors'
import { mapVisitors } from '../mappers/visitor-mapper'
import { generateResponse } from '../utils/response'

export const handler = async () => {
  const sheet = await getSpreadSheet({
    spreadsheetId: process.env.SHEET_ID,
    range: 'Sheet1',
  })

  try {
    const visitors = mapVisitors(sheet)

    return generateResponse(JSON.stringify(visitors))
  } catch (error) {
    // output error message of known errors and exist
    const { knownError, message, statusCode } = error as BaseError
    if (knownError) {
      return generateResponse(message, statusCode)
    }

    // throw unknown errors
    throw error
  }
}
