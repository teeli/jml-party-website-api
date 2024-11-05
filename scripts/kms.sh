#!/usr/bin/env bash

# check tgat first and secondd arguments are provided
if [ "$#" -ne 2 ]; then
    echo "Usage: $0 [encrypt|decrypt] [text]"
    exit 1
fi

if [ "$1" == "encrypt" ]; then
    # encrypt the second argument
    echo -n "$2" > cipher
    aws kms encrypt --region eu-west-1 --key-id alias/terraform_secrets --plaintext "fileb://cipher" --output text --query CiphertextBlob
    rm cipher
elif [ "$1" == "decrypt" ]; then
    # decrypt the second argument
    echo -n "$2" > cipher
    aws kms decrypt --region eu-west-1 --key-id alias/terraform_secrets --ciphertext-blob fileb://<(cat cipher | base64 --decode) --output text --query Plaintext | base64 --decode
    rm cipher
else
    echo "Usage: $0 [encrypt|decrypt] [text]"
    exit 1
fi
