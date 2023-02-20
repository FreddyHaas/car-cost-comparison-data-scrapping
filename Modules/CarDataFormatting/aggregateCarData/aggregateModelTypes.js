const _500 = require("../../../Output/carDataFormatted/individualCarDataFormatted/carDataFormatted_500.json")
const _1000 = require("../../../Output/carDataFormatted/individualCarDataFormatted/carDataFormatted_1000.json")
const _1500 = require("../../../Output/carDataFormatted/individualCarDataFormatted/carDataFormatted_1500.json")
const _2000 = require("../../../Output/carDataFormatted/individualCarDataFormatted/carDataFormatted_2000.json")
const _2500 = require("../../../Output/carDataFormatted/individualCarDataFormatted/carDataFormatted_2500.json")
const _3000 = require("../../../Output/carDataFormatted/individualCarDataFormatted/carDataFormatted_3000.json")
const _3500 = require("../../../Output/carDataFormatted/individualCarDataFormatted/carDataFormatted_3500.json")
const _4000 = require("../../../Output/carDataFormatted/individualCarDataFormatted/carDataFormatted_4000.json")
const _4500 = require("../../../Output/carDataFormatted/individualCarDataFormatted/carDataFormatted_4500.json")
const _5000 = require("../../../Output/carDataFormatted/individualCarDataFormatted/carDataFormatted_5000.json")
const _5500 = require("../../../Output/carDataFormatted/individualCarDataFormatted/carDataFormatted_5500.json")
const _End = require("../../../Output/carDataFormatted/individualCarDataFormatted/carDataFormatted_End.json")

const fs = require("fs")

const files = {
    _500,
    _1000,
    _1500,
    _2000,
    _2500,
    _3000,
    _3500,
    _4000,
    _4500,
    _5000,
    _5500,
    _End,
}

const fileNames = Object.keys(files)

const modelTypeList = {}

fileNames.forEach((fileName) => {
    files[fileName].forEach((car) => {
        carName = car.name.brand + " " + car.name.modelName

        let type = car.name.type

        if (type === null) {
            type = "Basisausstattung"
        }

        typeInformation = {
            name: type,
            costs: [...car.costs],
            price: car.basicData.basePrice,
            consumption: car.consumption,
            powerInHP: car.technicalData.powerInHP,
            drivetrain: car.technicalData.drivetrain,
            gearbox: car.technicalData.gearBox,
            identifier: car.searchName.identifier,
        }

        if (modelTypeList[carName] === undefined) {
            let variant = car.name.variant
            if (variant === "" || variant === " ") {
                variant = "Basisvariante"
            }

            modelTypeList[carName] = {
                modelInformation: {
                    brand: car.name.brand,
                    range: car.name.range,
                    variant: variant,
                    modelName: car.name.modelName,
                    modelNameShort: car.name.modelNameShort,
                    bodyType: car.size.bodyType,
                    vehicleClass: car.size.class,
                    motorType: car.technicalData.motorType,
                },

                types: [typeInformation],
            }
        } else {
            modelTypeList[carName]["types"].push(typeInformation)
        }
    })
})

const modelNames = Object.keys(modelTypeList)

modelNames.forEach((modelName) => {
    modelTypeList[modelName]["minCosts"] = {}

    modelTypeList[modelName].types.forEach((type) => {
        type.costs.forEach((costItem) => {
            // Check if month already exists in cost-matrix, else add
            if (
                modelTypeList[modelName]["minCosts"][costItem.months] ===
                undefined
            ) {
                modelTypeList[modelName]["minCosts"][costItem.months] = {}
            }

            // Check if kilometers already exists in cost-matrix, else add kilometers with respective costs
            if (
                modelTypeList[modelName]["minCosts"][costItem.months][
                    costItem.kilometers
                ] === undefined
            ) {
                modelTypeList[modelName]["minCosts"][costItem.months][
                    costItem.kilometers
                ] = { cost: costItem.total, costScore: costItem.costScore }
            } else {
                // If cost estimate for particular month and kilometers exist, check if cost of model are cheaper and can be updated
                if (
                    modelTypeList[modelName]["minCosts"][costItem.months][
                        costItem.kilometers
                    ]["cost"] > costItem.total
                ) {
                    modelTypeList[modelName]["minCosts"][costItem.months][
                        costItem.kilometers
                    ] = { cost: costItem.total, costScore: costItem.costScore }
                }
            }
        })
    })
})

fs.writeFileSync(
    `./Output/carDataFormatted/modelTypeList/modelTypeList_All.json`,
    JSON.stringify(modelTypeList)
)
