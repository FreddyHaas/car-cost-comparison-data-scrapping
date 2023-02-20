const modelTypeList = require("../../../Output/carDataFormatted/modelTypeList/modelTypeList_All.json")
const fs = require("fs")

let variantModelsList = {}

const modelNames = Object.keys(modelTypeList)

modelNames.forEach((model) => {
    const {
        brand,
        range,
        variant,
        modelName,
        modelNameShort,
        bodyType,
        vehicleClass,
        motorType,
    } = modelTypeList[model]["modelInformation"]

    const variantName = brand + " " + range + " " + variant

    const modelInformation = {
        modelName: modelName,
        modelNameShort: modelNameShort,
        bodyType: bodyType,
        vehicleClass: vehicleClass,
        motorType: motorType,
        minCosts: modelTypeList[model]["minCosts"],
    }

    if (variantModelsList[variantName] === undefined) {
        variantModelsList[variantName] = {
            name: {
                brand: brand,
                range: range,
                variant: variant,
            },
            models: [modelInformation],
        }
    } else {
        variantModelsList[variantName]["models"].push(modelInformation)
    }
})

// Add minimum costs per Variant
const variantNames = Object.keys(variantModelsList)

variantNames.forEach((variantName) => {
    // Create field for minimum cost of variant
    variantModelsList[variantName]["minCosts"] = {}

    // Loop through all models and find minimum cost
    variantModelsList[variantName]["models"].forEach((model) => {
        const months = Object.keys(model.minCosts)

        months.forEach((month) => {
            if (
                variantModelsList[variantName]["minCosts"][month] === undefined
            ) {
                variantModelsList[variantName]["minCosts"][month] = {}
            }

            const kilometers = Object.keys(model["minCosts"][month])

            kilometers.forEach((kilometer) => {
                if (
                    variantModelsList[variantName]["minCosts"][month][
                        kilometer
                    ] === undefined
                ) {
                    variantModelsList[variantName]["minCosts"][month][
                        kilometer
                    ] = model["minCosts"][month][kilometer]
                } else if (
                    variantModelsList[variantName]["minCosts"][month][
                        kilometer
                    ]["cost"] > model["minCosts"][month][kilometer]["cost"]
                ) {
                    variantModelsList[variantName]["minCosts"][month][
                        kilometer
                    ] = model["minCosts"][month][kilometer]
                }
            })
        })
    })
})

fs.writeFileSync(
    "./Output/carDataFormatted/variantModelsList/variantModelList_All.json",
    JSON.stringify(variantModelsList)
)
