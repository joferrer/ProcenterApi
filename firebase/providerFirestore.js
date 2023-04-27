const admin = require("firebase-admin");
const credentials = require("./key.json");

admin.initializeApp({
  credential: admin.credential.cert(credentials),
  databaseURL: 'https://your-project-id.firebaseio.com'
});

const db = admin.firestore();
const auth = admin.auth();
module.exports = { db, auth };


