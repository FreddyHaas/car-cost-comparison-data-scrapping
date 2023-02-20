const rawList = require("../../Output/carListRaw.json")
const fs = require("fs")

const carList = []

// Loop through pages from search results
rawList.forEach((page) => {
    // For each page get all Car Model Ranges
    const { items } = page.data.carSearch

    // For each Car Model Range, get all cars and extract relevant data
    items.forEach((carModelRange) => {
        carModelRange.cars.forEach((car) => {
            const carInfo = {
                brand: car.brandSlug,
                range: car.rangeSlug,
                generation: car.generationSlug,
                id: car.id,
            }
            carList.push(carInfo)
        })
    })
})

console.log(carList.length)

fs.writeFileSync("./Output/carListClean.json", JSON.stringify(carList))
