import { PartyConfig } from '../data-sources/parties'

export const parties: Record<string, PartyConfig> = {
  jmlparty24: {
    sheetId: '1yD6vkJDBYv0_TNpbLuRdFnlK8m6styZkui1EkHWXDu8',
    sheetName: 'Form Responses 1',
    columns: {
      handle: 'Handle/Nickname',
      group: 'Group',
      hidden:
        'Can we show your handle on a list of visitors on the jml.party website?',
    },
  },
  jmlparty25: {
    // TODO: Enable party when sheet is available
    enabled: false,
    sheetId: '',
    sheetName: '',
    columns: {
      handle: '',
      group: '',
      hidden: '',
    },
  },
  jmlwinter25: {
    sheetId: '1tmZI9kN1AUh1B9aMpPdzlq8g1o3Nzq_5237fvKNNRz4',
    sheetName: 'Form Responses 1',
    columns: {
      handle:
        'Your demoscene handle (for contacting and party related announcements) ',
      group: 'Your demoscene group',
      hidden:
        'Can we show your handle on a list of partygoers on the winter.jml.party website?',
    },
  },
  '68kinside25': {
    sheetId: '1TquTl8TQQpH84iWUyLDWDUewMc2iMRby53Ts9cjO4vY',
    sheetName: 'Form Responses 1',
    columns: {
      handle: 'Handle',
      group: 'Group',
      hidden: 'Can we show your handle in the visitor list on the website?',
    },
  },
} as const

export const defaultParty = parties.jmlparty24
