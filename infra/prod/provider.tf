provider "aws" {
  region              = "eu-west-1"
  allowed_account_ids = ["664585720177"]
  default_tags {
    tags = {
      application = "jml-party-api"
      component   = "infra"
    }
  }
}
