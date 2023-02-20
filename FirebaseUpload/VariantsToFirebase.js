const db = require("./FirebaseConnect.js")
const variantModelList = require("../Output/carDataFormatted/variantModelsList/variantModelList_All.json")

const variantNames = Object.keys(variantModelList)
const noOfVariants = variantNames.length

const UPLOAD_NUMBER = 100 // Number of simultaneous uploads

// Upload data
async function uploadCollection(carVariantNames) {
    await Promise.all(
        carVariantNames.map((variantName) => {
            const encodedName = encodeURIComponent(variantName)
            return uploadData(variantModelList[variantName], encodedName)
        })
    )
}

// Create new document in firebase
async function uploadData(data, name) {
    const docRef = db.collection("variants").doc(name)

    try {
        await docRef.set(data)
    } catch (err) {
        console.log(err)
    }
}

async function uploadChunks() {
    for (let i = 0; i < noOfVariants; i += UPLOAD_NUMBER) {
        const uploadArray = variantNames.slice(i, i + UPLOAD_NUMBER)
        await uploadCollection(uploadArray)
        console.log("Uploaded items: " + (i + UPLOAD_NUMBER))
    }
}

uploadChunks()
