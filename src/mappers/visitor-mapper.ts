import { VisitorsNotFoundError } from '../errors/errors'
import { SheetData } from '../types/sheets'

export const mapVisitors = (sheet: SheetData) => {
  const values = sheet.data.values

  if (!values || values.length === 0) {
    throw new VisitorsNotFoundError()
  }

  // first row contains headers, ignore that from response
  const visitors = values.slice(1)
  return visitors.map((row: string[]) => ({
    handle: row[4] === '1' ? row[2] : '(hidden)',
    hidden: row[4],
  }))
}
