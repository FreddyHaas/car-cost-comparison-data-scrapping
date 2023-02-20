const carListRaw = require("../../../Output/carListRaw/carListRaw.json")
const fs = require("fs")

const IdVariantList = {}

carListRaw.forEach((range) => {
    range.data.carSearch.items.forEach((item) => {
        item.cars.forEach((car) => {
            IdVariantList[car.id] = item.variantTerm
        })
    })
})

fs.writeFileSync(
    "./Output/carDataFormatted/carCategoriesInterimResults/idVariantList.json",
    JSON.stringify(IdVariantList)
)
