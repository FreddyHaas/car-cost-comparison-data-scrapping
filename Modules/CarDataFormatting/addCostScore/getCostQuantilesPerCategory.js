const statistics = require("simple-statistics")
const carCosts = require("../../../Output/carDataFormatted/carCostScoreInterimResults/costsPerCategory.json")
const fs = require("fs")

const bodyTypes = Object.keys(carCosts)

bodyTypes.forEach((bodyType) => {
    const classes = Object.keys(carCosts[bodyType])

    classes.forEach((carClass) => {
        const months = Object.keys(carCosts[bodyType][carClass])

        months.forEach((month) => {
            const kilometers = Object.keys(carCosts[bodyType][carClass][month])

            kilometers.forEach((kilometer) => {
                // Only calculate quantiles if at least 10 values exist
                if (carCosts[bodyType][carClass][month][kilometer].length > 9) {
                    carCosts[bodyType][carClass][month][kilometer] =
                        statistics.quantile(
                            carCosts[bodyType][carClass][month][kilometer],
                            [0.2, 0.4, 0.6, 0.8, 1]
                        )
                } else {
                    carCosts[bodyType][carClass][month][kilometer] = [""]
                }
            })
        })
    })
})

fs.writeFileSync(
    "./Output/carDataFormatted/carCostScoreInterimResults/costQuantilesPerCategory.json",
    JSON.stringify(carCosts)
)
