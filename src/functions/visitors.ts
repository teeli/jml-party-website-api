import middy from '@middy/core'
import {
  APIGatewayProxyEventPathParameters,
  APIGatewayProxyResult,
} from 'aws-lambda'
import { type Event as HTTPEventNormalizerEvent } from '@middy/http-event-normalizer'

import { getPartyConfig } from '../data-sources/parties'
import { getSpreadSheet } from '../data-sources/sheets'
import { mapVisitors } from '../mappers/visitor-mapper'
import { PartyID } from '../types/parties'
import { jsonResponse } from '../utils/api-gateway'
import { defaultMiddlewares } from '../utils/middleware'

export interface VisitorsAPIGatewayProxyEventPathParameters
  extends APIGatewayProxyEventPathParameters {
  party: PartyID | undefined
}

export interface VisitorsAPIGatewayProxyEvent
  extends Omit<HTTPEventNormalizerEvent, 'pathParameters'> {
  pathParameters: VisitorsAPIGatewayProxyEventPathParameters
}

const handlerFunction = async (
  event: VisitorsAPIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  const partyConfig = getPartyConfig(event.pathParameters.party)

  if (!partyConfig.enabled) {
    return jsonResponse([])
  }

  const sheet = await getSpreadSheet({
    spreadsheetId: partyConfig.sheetId,
    range: partyConfig.sheetName,
  })

  const visitors = mapVisitors(sheet, partyConfig.columns)
  return jsonResponse(visitors)
}

export const handler = middy(handlerFunction).use(defaultMiddlewares())
