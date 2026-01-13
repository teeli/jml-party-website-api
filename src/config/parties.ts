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
    enabled: true,
    sheetId: '10Qv6n_BC6T8VjY6QRgdvD__3pM9d2UwrjjXVdwYJTKM',
    sheetName: 'Form Responses 1',
    columns: {
      handle: 'Handle/Nickname',
      group: 'Group',
      hidden:
        'Can we show your handle on a list of visitors on the jml.party website?',
    },
    domains: jmlpartyOrigins,
  },
  jmlparty26: {
    enabled: true,
    sheetId: '1k52FeiFR1UBQQcUcC86VMlX7G4xTywcMb9v466I2Qkg',
    sheetName: 'Form Responses 1',
    columns: {
      handle: 'Handle/Nickname',
      group: 'Group',
      hidden:
        'Can we show your handle on a list of visitors on the jml.party website?',
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
  jmlwinter26: {
    enabled: true,
    sheetId: '1hzcD3R9auoNRAD1UuilCG86WNXz5L9J7QLSVJg0XMlU', // TODO: Define Sheet ID
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
  '68kinside26': {
    enabled: true,
    sheetId: '1vfiPnxqBdURwO8tm9guTQTvS2UR7rOujLJG3DwJ2XsA',
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
