# Jumalauta party website API

API for the Jumalauta party website.

Currently contains only one endpoint to get registered visitors from registration form responses in Google Sheets and
return them as JSON.

If you really want to deploy this, you need your own Google Service account with access to the specified Google Sheets
spreadsheet. Save credentials to `.config/google-auth-<serverless-stage>.json`.
