import middy from '@middy/core'
import { APIGatewayEvent } from 'aws-lambda'

import { getPartyConfig } from '../data-sources/parties'
import { getSpreadSheet } from '../data-sources/sheets'
import { mapVisitors } from '../mappers/visitor-mapper'
import { defaultMiddlewares } from '../utils/middleware'

const handlerFunction = async (event: APIGatewayEvent) => {
  const partyConfig = getPartyConfig(event.pathParameters.party)

  const sheet = await getSpreadSheet({
    spreadsheetId: partyConfig.sheetId,
    range: partyConfig.sheetName,
  })

  return mapVisitors(sheet, partyConfig.columns)
}

export const handler = middy().use(defaultMiddlewares).handler(handlerFunction)
