const A = require("../../../Output/carDataClean/carDataClean500.json")
const B = require("../../../Output/carDataClean/carDataClean1000.json")
const C = require("../../../Output/carDataClean/carDataClean1500.json")
const D = require("../../../Output/carDataClean/carDataClean2000.json")
const E = require("../../../Output/carDataClean/carDataClean2500.json")
const F = require("../../../Output/carDataClean/carDataClean3000.json")
const G = require("../../../Output/carDataClean/carDataClean3500.json")
const H = require("../../../Output/carDataClean/carDataClean4000.json")
const I = require("../../../Output/carDataClean/carDataClean4500.json")
const J = require("../../../Output/carDataClean/carDataClean5000.json")
const K = require("../../../Output/carDataClean/carDataClean5500.json")
const L = require("../../../Output/carDataClean/carDataCleanEnd.json")

const fs = require("fs")

const allCarData = [A, B, C, D, E, F, G, H, I, J, K, L]

const carCosts = {}

allCarData.forEach((carData) => {
    carData.forEach((car) => {
        // Create body type if necessary
        if (carCosts[car.size.bodyType] === undefined) {
            carCosts[car.size.bodyType] = {}
        }

        // Create class if necessary
        if (carCosts[car.size.bodyType][car.size.class] === undefined) {
            const costPerCar = {}

            // Add costs for each month and kilometer
            car.costs.forEach((costItem) => {
                // Add month if necessary
                if (costPerCar[costItem.months] === undefined) {
                    costPerCar[costItem.months] = {}
                }

                costPerCar[costItem.months][costItem.kilometers] = [
                    costItem.total,
                ]
                carCosts[car.size.bodyType][car.size.class] = costPerCar
            })
        } else {
            car.costs.forEach((costItem) => {
                if (
                    carCosts[car.size.bodyType][car.size.class][
                        costItem.months
                    ] === undefined
                ) {
                    carCosts[car.size.bodyType][car.size.class][
                        costItem.months
                    ] = {}
                }
                if (
                    carCosts[car.size.bodyType][car.size.class][
                        costItem.months
                    ][costItem.kilometers] === undefined
                ) {
                    carCosts[car.size.bodyType][car.size.class][
                        costItem.months
                    ][costItem.kilometers] = []
                }

                carCosts[car.size.bodyType][car.size.class][costItem.months][
                    costItem.kilometers
                ].push(costItem.total)
            })
        }
    })
})

fs.writeFileSync(
    "./Output/carDataFormatted/carCostScoreInterimResults/costsPerCategory.json",
    JSON.stringify(carCosts)
)
