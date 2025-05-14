import { defaultParty, parties } from '../config/parties'
import { PartyNotFoundError } from '../errors/errors'
import { PartyID, PartyConfig } from '../types/parties'

export const getPartyConfig = (party?: PartyID): PartyConfig => {
  if (party) {
    if (!parties[party]) {
      throw new PartyNotFoundError()
    }
    return parties[party]
  }

  // use jml25 as default for backwards compatibility
  return defaultParty
}
