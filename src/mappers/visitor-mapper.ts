import { VisitorsNotFoundError } from '../errors/errors'
import { ColumnConfig } from '../types/parties'
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
  return visitors.map<Visitor>((row) => {
    const hidden = row[headings.indexOf(columns.hidden)] !== 'Yes'
    return {
      handle: hidden
        ? '(hidden)'
        : (row[headings.indexOf(columns.handle)] as string),
      group: hidden
        ? undefined
        : (row[headings.indexOf(columns.group)] as string),
      hidden,
    } satisfies Visitor
  })
}
