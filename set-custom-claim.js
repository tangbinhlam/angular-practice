var admin = require("firebase-admin");
var uid = process.argv[2];
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://angular-practice-c3a71.firebaseio.com"
});

admin.auth().setCustomUserClaims(uid, { admin: true }).then(() => {
  console.log('custom claims set for user', uid);
  process.exit();
});
