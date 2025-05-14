import { describe, it } from 'vitest'

import { PartyID } from '../types/parties'

import { getPartyConfig } from './parties'

describe('parties data source', () => {
  it('should return default party config', async ({ expect }) => {
    const partyConfig = getPartyConfig()
    expect(partyConfig).toEqual({
      columns: {
        group: 'Group',
        handle: 'Handle/Nickname',
        hidden:
          'Can we show your handle on a list of visitors on the jml.party website?',
      },
      domains: [
        'https://jml.party',
        'https://www.jml.party',
        'https://summer.jml.party',
      ],
      enabled: true,
      sheetId: '1yD6vkJDBYv0_TNpbLuRdFnlK8m6styZkui1EkHWXDu8',
      sheetName: 'Form Responses 1',
    })
  })

  it('should return defined party config', async ({ expect }) => {
    const partyConfig = getPartyConfig('jmlwinter25')
    expect(partyConfig).toEqual({
      columns: {
        group: 'Your demoscene group',
        handle:
          'Your demoscene handle (for contacting and party related announcements) ',
        hidden:
          'Can we show your handle on a list of partygoers on the winter.jml.party website?',
      },
      domains: [
        'https://jml.party',
        'https://www.jml.party',
        'https://winter.jml.party',
      ],
      enabled: true,
      sheetId: '1tmZI9kN1AUh1B9aMpPdzlq8g1o3Nzq_5237fvKNNRz4',
      sheetName: 'Form Responses 1',
    })
  })

  it('should throw on non-existing party config', async ({ expect }) => {
    expect(() => getPartyConfig('asdfadfad' as PartyID)).toThrowError(
      'Party not found',
    )
  })
})
