data "aws_kms_secrets" "google_auth" {
  secret {
    name    = "project_id"
    payload = var.project_id
  }
  secret {
    name    = "private_key_id"
    payload = var.private_key_id
  }
  secret {
    name    = "private_key"
    payload = var.private_key
  }
  secret {
    name    = "client_email"
    payload = var.client_email
  }
  secret {
    name    = "client_id"
    payload = var.client_id
  }
}

resource "aws_ssm_parameter" "type" {
  name  = "/jmlparty-api/google-auth/type"
  type  = "SecureString"
  value = var.type
}

resource "aws_ssm_parameter" "project_id" {
  name  = "/jmlparty-api/google-auth/project_id"
  type  = "SecureString"
  value = data.aws_kms_secrets.google_auth.plaintext["project_id"]
}

resource "aws_ssm_parameter" "private_key_id" {
  name  = "/jmlparty-api/google-auth/private_key_id"
  type  = "SecureString"
  value = data.aws_kms_secrets.google_auth.plaintext["private_key_id"]
}

resource "aws_ssm_parameter" "private_key" {
  name  = "/jmlparty-api/google-auth/private_key"
  type  = "SecureString"
  value = data.aws_kms_secrets.google_auth.plaintext["private_key"]
}

resource "aws_ssm_parameter" "client_email" {
  name  = "/jmlparty-api/google-auth/client_email"
  type  = "SecureString"
  value = data.aws_kms_secrets.google_auth.plaintext["client_email"]
}

resource "aws_ssm_parameter" "client_id" {
  name  = "/jmlparty-api/google-auth/client_id"
  type  = "SecureString"
  value = data.aws_kms_secrets.google_auth.plaintext["client_id"]
}
