import { defaultParty, parties } from '../config/parties'
import { PartyNotFoundError } from '../errors/errors'
import { PartyID, PartyConfig } from '../types/parties'

export const getPartyConfig = (party?: PartyID | string): PartyConfig => {
  if (party) {
    if (!isValidParty(party)) {
      throw new PartyNotFoundError()
    }
    return parties[party]
  }

  // use jml25 as default for backwards compatibility
  return defaultParty
}

const isValidParty = (party?: string): party is PartyID =>
  party !== undefined && Object.keys(parties).includes(party)
