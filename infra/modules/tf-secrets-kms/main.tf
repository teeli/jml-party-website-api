resource "aws_kms_key" "terraform_secrets" {
  description = "Key used for Terraform aws_kms_secrets: https://www.terraform.io/docs/providers/aws/d/kms_secrets.html"
}

resource "aws_kms_alias" "terraform_secrets" {
  name          = "alias/terraform_secrets"
  target_key_id = aws_kms_key.terraform_secrets.key_id
}
