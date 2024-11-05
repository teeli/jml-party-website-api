variable "type" {
  type        = string
  description = "Google auth type"
}

variable "project_id" {
  type        = string
  description = "Encrypted Google auth project id"
}

variable "private_key_id" {
  type        = string
  description = "Encrypted Google auth private key id"
}

variable "private_key" {
  type        = string
  description = "Encrypted Google auth private key"
}

variable "client_email" {
  type        = string
  description = "Encrypted Google auth client email"
}

variable "client_id" {
  type        = string
  description = "Encrypted Google auth client id"
}
