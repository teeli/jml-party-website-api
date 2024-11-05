terraform {
  backend "s3" {
    region         = "eu-west-1"
    encrypt        = "true"
    bucket         = "aciddose-terraform"
    key            = "jmlparty-website-api.tfstate"
    dynamodb_table = "aciddose-terraform-lock"
  }
}
