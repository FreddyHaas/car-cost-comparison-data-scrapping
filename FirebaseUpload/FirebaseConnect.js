const { initializeApp, cert } = require("firebase-admin/app")
const { getFirestore } = require("firebase-admin/firestore")

// Set-up firebase
const serviceAccount = require("../../../Desktop/key.json")

initializeApp({
    credential: cert(serviceAccount),
})

const database = getFirestore()

module.exports = database
