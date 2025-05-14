import { parties } from '../config/parties'

export type ColumnConfig = {
  handle: string
  group: string
  hidden: string
}

export type PartyConfig = {
  enabled: boolean
  sheetId: string
  sheetName: string
  columns: ColumnConfig
  /**
   * List of domains for the party website. Used for CORS.
   */
  domains: string[]
}

export type PartyConfigs = Record<string, PartyConfig>

export type PartyID = keyof typeof parties
