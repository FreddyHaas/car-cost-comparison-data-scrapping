const db = require("./FirebaseConnect.js")
const brandRangeList = require("../Output/dropdownLists/brandRangeList.json")
const rangeModelList = require("../Output/dropdownLists/rangeModelList.json")

// Upload Range-Model-List
async function uploadRangeModelList() {
    promises = []

    const rangeNames = Object.keys(rangeModelList)

    rangeNames.forEach((rangeName) => {
        const encodedName = encodeURIComponent(rangeName)
        promises.push(uploadData(rangeModelList[rangeName], encodedName))
    })

    await Promise.all(promises)

    console.log("Range-Model-List uploaded")
}

// Create new document in firebase and upload one item from list
async function uploadData(data, name) {
    const docRef = db.collection("dropdownLists").doc(name)

    try {
        await docRef.set(data)
    } catch (err) {
        console.log(err)
    }
}

// Upload Brand-Range-List
async function uploadBrandRangeList() {
    const docRef = db.collection("dropdownLists").doc("BrandRangeList")

    try {
        await docRef.set(brandRangeList)
        console.log("Brand-Range-List uploaded")
    } catch (err) {
        console.log(err)
    }
}

uploadRangeModelList()
uploadBrandRangeList()
