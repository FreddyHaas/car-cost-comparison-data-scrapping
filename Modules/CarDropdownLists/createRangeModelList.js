const modelTypeList = require("../../Output/carDataFormatted/modelTypeList/modelTypeList_All.json")
const fs = require("fs")

const carModelNames = Object.keys(modelTypeList)

const rangeVariantModelList = {}

carModelNames.forEach((carModelName) => {
    let { brand, range, variant, modelNameShort } =
        modelTypeList[carModelName]["modelInformation"]

    rangeName = brand + " " + range

    rangeVariantModelList[rangeName] = rangeVariantModelList[rangeName] || {}

    if (rangeVariantModelList[rangeName][variant] === undefined) {
        rangeVariantModelList[rangeName][variant] = [modelNameShort]
    } else {
        rangeVariantModelList[rangeName][variant].push(modelNameShort)
    }
})

fs.writeFileSync(
    "./Output/dropdownLists/rangeModelList.json",
    JSON.stringify(rangeVariantModelList)
)
