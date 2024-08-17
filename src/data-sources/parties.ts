import { defaultParty, parties } from '../config/parties'
import { PartyNotFoundError } from '../errors/errors'

export type ColumnConfig = {
  handle: string
  group: string
  hidden: string
}

export type PartyConfig = {
  sheetId: string
  sheetName: string
  columns: ColumnConfig
}

export const getPartyConfig = (party?: string): PartyConfig => {
  if (party) {
    if (!parties[party]) {
      throw new PartyNotFoundError()
    }
    return parties[party]
  }

  // use jml25 as default for backwards compatibility
  return defaultParty
}
