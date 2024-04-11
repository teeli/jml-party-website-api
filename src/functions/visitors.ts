import middy from '@middy/core'

import { getSpreadSheet } from '../data-sources/sheets'
import { mapVisitors } from '../mappers/visitor-mapper'
import { defaultMiddlewares } from '../utils/middleware'

const handlerFunction = async () => {
  const sheet = await getSpreadSheet({
    spreadsheetId: process.env.SHEET_ID,
    range: process.env.SHEET_NAME,
  })

  return mapVisitors(sheet)
}

export const handler = middy().use(defaultMiddlewares).handler(handlerFunction)
