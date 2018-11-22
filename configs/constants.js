module.exports = {
  "auth": {
    "google": {
      "CLIENT_ID": "481168917552-98rbud4gtigkatet64kaas964j1s4m51.apps.googleusercontent.com",
      "CLIENT_SECRET": "DNXtUXW5z4Woi2xlvltLwxGQ",
      "CALLBACK_URL": "/auth/google/callback",
      "SCOPES": ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"]
    },
    "jwt": {
      "SECRET": "albertsecret",
      "EXPIRESIN": "24h"
    }
  }
}
