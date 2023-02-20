const _500 = require("../../../Output/carDataClean/carDataClean500.json")
const _1000 = require("../../../Output/carDataClean/carDataClean1000.json")
const _1500 = require("../../../Output/carDataClean/carDataClean1500.json")
const _2000 = require("../../../Output/carDataClean/carDataClean2000.json")
const _2500 = require("../../../Output/carDataClean/carDataClean2500.json")
const _3000 = require("../../../Output/carDataClean/carDataClean3000.json")
const _3500 = require("../../../Output/carDataClean/carDataClean3500.json")
const _4000 = require("../../../Output/carDataClean/carDataClean4000.json")
const _4500 = require("../../../Output/carDataClean/carDataClean4500.json")
const _5000 = require("../../../Output/carDataClean/carDataClean5000.json")
const _5500 = require("../../../Output/carDataClean/carDataClean5500.json")
const _End = require("../../../Output/carDataClean/carDataCleanEnd.json")

const costQuantiles = require("../../../Output/carDataFormatted/carCostScoreInterimResults/costQuantilesPerCategory.json")
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

const names = Object.keys(files)

names.forEach((name) => {
    files[name].forEach((car) => {
        car.costs.forEach((costItem) => {
            // Get cost quantiles array
            const quantilesArray =
                costQuantiles[car.size.bodyType][car.size.class][
                    costItem.months
                ][costItem.kilometers]

            // Check if cost quantiles array is not "" (i.e. too few values)
            if (quantilesArray[0] !== "") {
                let cost = costItem.total

                if (cost <= quantilesArray[0]) {
                    costItem["costScore"] = "very cheap"
                } else if (cost <= quantilesArray[1]) {
                    costItem["costScore"] = "cheap"
                } else if (cost <= quantilesArray[2]) {
                    costItem["costScore"] = "medium"
                } else if (cost <= quantilesArray[3]) {
                    costItem["costScore"] = "expensive"
                } else {
                    costItem["costScore"] = "very expensive"
                }
            } else {
                costItem["costScore"] = null
            }
        })
    })

    fs.writeFileSync(
        `./Output/carDataFormatted/carDataFormatted${name}.json`,
        JSON.stringify(files[name])
    )
})
