const list = require("../../../../Output/carDataFormatted/modelTypeList/modelTypeList_All.json")

let numberOfTypes = 0

const modelNames = Object.keys(list)

modelNames.forEach((modelName) => {
    numberOfTypes += list[modelName]["types"].length
})

console.log(numberOfTypes)
console.log(modelNames.length)
