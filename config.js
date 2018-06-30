module.exports = {
  client: {
    url: process.env.TRENDBLOG_APP_CLIENT_DOMAIN
  },
  secret: process.env.TRENDBLOG_SECRET,
  firebase_api_key: process.env.FIREBASE_API_KEY,
  firebase_auth_domain: process.env.FIREBASE_AUTH_DOMAIN,
  firebase_project_id: process.env.FIREBASE_PROJECT_ID,
  google_oauth_client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
  google_oauth_client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET
}
