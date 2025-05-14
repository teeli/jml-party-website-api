import { parties } from '../config/parties'

export const DEFAULT_ORIGIN = 'https://jml.party'

const commonOrigins = [
  /^http:\/\/localhost:\d*$/,
  /^https:\/\/.*teelis-projects.vercel.app$/,
]

export const getCorsOrigin = (incomingOrigin: string) => {
  const partyDomains = Object.values(parties).flatMap((party) => party.domains)

  // TODO: Add filtering based on selected party. Currently we can live with all parties being allowed in all CORS
  if (partyDomains.includes(incomingOrigin)) {
    return incomingOrigin
  }

  for (const origin of commonOrigins) {
    if (origin.test(incomingOrigin)) {
      return incomingOrigin
    }
  }

  return DEFAULT_ORIGIN
}
