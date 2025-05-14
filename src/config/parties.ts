import { PartyConfigs } from '../types/parties'

const jmlpartyOrigins = [
  'https://jml.party',
  'https://www.jml.party',
  'https://summer.jml.party',
]

const jmlwinterOrigins = [
  'https://jml.party',
  'https://www.jml.party',
  'https://winter.jml.party',
]

const inside68kOrigins = [
  'https://68k-inside.party',
  'https://www.68k-inside.party',
]

export const parties = {
  jmlparty24: {
    enabled: true,
    sheetId: '1yD6vkJDBYv0_TNpbLuRdFnlK8m6styZkui1EkHWXDu8',
    sheetName: 'Form Responses 1',
    columns: {
      handle: 'Handle/Nickname',
      group: 'Group',
      hidden:
        'Can we show your handle on a list of visitors on the jml.party website?',
    },
    domains: jmlpartyOrigins,
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
    domains: jmlpartyOrigins,
  },
  jmlwinter25: {
    enabled: true,
    sheetId: '1tmZI9kN1AUh1B9aMpPdzlq8g1o3Nzq_5237fvKNNRz4',
    sheetName: 'Form Responses 1',
    columns: {
      handle:
        'Your demoscene handle (for contacting and party related announcements) ',
      group: 'Your demoscene group',
      hidden:
        'Can we show your handle on a list of partygoers on the winter.jml.party website?',
    },
    domains: jmlwinterOrigins,
  },
  '68kinside25': {
    enabled: true,
    sheetId: '1TquTl8TQQpH84iWUyLDWDUewMc2iMRby53Ts9cjO4vY',
    sheetName: 'Form Responses 1',
    columns: {
      handle: 'Handle',
      group: 'Group',
      hidden: 'Can we show your handle in the visitor list on the website?',
    },
    domains: inside68kOrigins,
  },
  alwaysDisabled: {
    enabled: false,
    sheetId: '',
    sheetName: '',
    columns: {
      handle: '',
      group: '',
      hidden: '',
    },
    domains: [],
  },
} satisfies PartyConfigs

// TODO: Default party can be removed after jmlparty 25 website launch
export const defaultParty = parties.jmlparty24
