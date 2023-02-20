const db = require("./FirebaseConnect.js")
const modelTypeList = require("../Output/carDataFormatted/modelTypeList/modelTypeList_All.json")

const modelNames = Object.keys(modelTypeList)
const noOfModels = modelNames.length

console.log(noOfModels)

const UPLOAD_NUMBER = 50 // Number of simultaneous uploads

// Upload data
async function uploadCollection(modelNames) {
    await Promise.all(
        modelNames.map((modelName) => {
            return uploadData(modelTypeList[modelName], modelName)
        })
    )
}

// Create new document in firebase
async function uploadData(data, name) {
    const docRef = db.collection("models").doc(name)

    try {
        await docRef.set(data)
    } catch (err) {
        console.log(err)
    }
}

async function uploadChunks() {
    for (let i = 0; i < noOfModels; i += UPLOAD_NUMBER) {
        const uploadArray = modelNames.slice(i, i + UPLOAD_NUMBER)
        await uploadCollection(uploadArray)
        console.log("Uploaded items: " + (i + UPLOAD_NUMBER))
    }
}

uploadChunks()
