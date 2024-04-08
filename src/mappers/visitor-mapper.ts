import { VisitorsNotFoundError } from '../errors/errors'
import { SheetData } from '../types/sheets'

const HANDLE_COL = 'Handle/Nickname'
const GROUP_COL = 'Group'
const HIDDEN_COL =
  'Can we show your handle on a list of visitors on the jml.party website?'

export const mapVisitors = (sheet: SheetData) => {
  const values = sheet.data.values

  if (!values || values.length === 0) {
    throw new VisitorsNotFoundError()
  }

  // first row contains headers, ignore that from response
  const headings = values[0]
  const visitors = values.slice(1)
  return visitors.map((row: string[]) => {
    const hidden = row[headings.indexOf(HIDDEN_COL)] !== 'Yes'
    return {
      handle: hidden ? '(hidden)' : row[headings.indexOf(HANDLE_COL)],
      group: hidden ? undefined : row[headings.indexOf(GROUP_COL)],
      hidden,
    }
  })
}
