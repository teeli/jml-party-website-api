export type ErrorSeverity = 'ERROR' | 'WARN'

export interface ConstructorParameters_ {
  message?: string
  severity?: ErrorSeverity
}

export abstract class BaseError extends Error {
  errorType: string
  knownError: boolean
  statusCode: number
  severity: ErrorSeverity

  constructor(parameters: {
    message: string
    statusCode?: number
    severity?: ErrorSeverity
  }) {
    super(parameters.message)
    this.knownError = true
    this.statusCode = parameters.statusCode ?? 500
    this.name = this.constructor.name
    this.errorType = this.name
    this.severity = parameters.severity ?? 'ERROR'
  }
}

export class VisitorsNotFoundError extends BaseError {
  constructor({
    message = 'No visitors found',
    ...constructorParameters
  }: ConstructorParameters_ = {}) {
    super({
      ...constructorParameters,
      statusCode: 404,
      message,
    })
  }
}

export class PartyNotFoundError extends BaseError {
  constructor({
    message = 'Party not found',
    ...constructorParameters
  }: ConstructorParameters_ = {}) {
    super({
      ...constructorParameters,
      statusCode: 404,
      message,
    })
  }
}
