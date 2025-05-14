import { describe, it } from 'vitest'

import { ColumnConfig } from '../types/parties'
import { SheetData } from '../types/sheets'

import { mapVisitors } from './visitor-mapper'

describe('visitor mapper', () => {
  it('should map visitors from sheet data', ({ expect }) => {
    const sheetData: SheetData = {
      data: {
        values: [
          ['handlecol', 'groupcol', 'shownamecol'],
          ['visitor 1', 'group 1', 'Yes'],
          ['visitor 2', 'group 2', 'Yes'],
          ['visitor 3', 'group 3', 'No'],
        ],
      },
    }

    const columns: ColumnConfig = {
      handle: 'handlecol',
      hidden: 'shownamecol',
      group: 'groupcol',
    }

    const visitors = mapVisitors(sheetData, columns)
    expect(visitors.length).toBe(3)
    expect(visitors).toEqual([
      {
        handle: 'visitor 1',
        group: 'group 1',
        hidden: false,
      },
      {
        handle: 'visitor 2',
        group: 'group 2',
        hidden: false,
      },
      {
        handle: '(hidden)',
        hidden: true,
      },
    ])
  })

  it('should throw on empty sheet data', ({ expect }) => {
    const sheetData: SheetData = {
      data: {
        values: [],
      },
    }

    const columns: ColumnConfig = {
      handle: 'handlecol',
      hidden: 'shownamecol',
      group: 'groupcol',
    }

    expect(() => mapVisitors(sheetData, columns)).toThrowError(
      'No visitors found',
    )
  })
})
