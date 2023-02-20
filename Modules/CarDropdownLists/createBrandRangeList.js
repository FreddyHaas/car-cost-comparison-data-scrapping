const variantModelList = require("../../Output/carDataFormatted/variantModelsList/variantModelList_All.json")

const fs = require("fs")

const variantNames = Object.keys(variantModelList)

const brandRangeList = {}

variantNames.forEach((variantName) => {
    const { brand, range } = variantModelList[variantName]["name"]

    brandRangeList[brand] = brandRangeList[brand] || []

    if (brandRangeList[brand] === undefined) {
        brandRangeList[brand] = [range]
    } else {
        if (!brandRangeList[brand].includes(range))
            brandRangeList[brand].push(range)
    }
})

fs.writeFileSync(
    "./Output/dropdownLists/brandRangeList.json",
    JSON.stringify(brandRangeList)
)
