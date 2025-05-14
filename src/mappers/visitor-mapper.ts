import { ColumnConfig } from '../data-sources/parties'
import { VisitorsNotFoundError } from '../errors/errors'
import { SheetData } from '../types/sheets'
import { Visitor } from '../types/visitors'

export const mapVisitors = (
  sheet: SheetData,
  columns: ColumnConfig,
): Visitor[] => {
  const values = sheet.data.values

  if (!values || values.length === 0) {
    throw new VisitorsNotFoundError()
  }

  // first row contains headers, ignore that from response
  const headings = values[0]
  const visitors = values.slice(1)
  return visitors.map((row: string[]): Visitor => {
    const hidden = row[headings.indexOf(columns.hidden)] !== 'Yes'
    return {
      handle: hidden ? '(hidden)' : row[headings.indexOf(columns.handle)],
      group: hidden ? undefined : row[headings.indexOf(columns.group)],
      hidden,
    }
  })
}
