const car500 = require("../../Output/carDataClean/carDataClean500.json")
const car1000 = require("../../Output/carDataClean/carDataClean1000.json")
const car1500 = require("../../Output/carDataClean/carDataClean1500.json")
const car2000 = require("../../Output/carDataClean/carDataClean2000.json")
const car2500 = require("../../Output/carDataClean/carDataClean2500.json")
const car3000 = require("../../Output/carDataClean/carDataClean3000.json")
const car3500 = require("../../Output/carDataClean/carDataClean3500.json")
const car4000 = require("../../Output/carDataClean/carDataClean4000.json")
const car4500 = require("../../Output/carDataClean/carDataClean4500.json")
const car5000 = require("../../Output/carDataClean/carDataClean5000.json")
const car5500 = require("../../Output/carDataClean/carDataClean5500.json")
const carEnd = require("../../Output/carDataClean/carDataCleanEnd.json")

const fs = require("fs")

const carData = [
    car500,
    car1000,
    car1500,
    car2000,
    car2500,
    car3000,
    car3500,
    car4000,
    car4500,
    car5000,
    car5500,
    carEnd,
]

const listOfBrands = []

for (const data of carData) {
    data.forEach((car) => {
        // Create List of Brands
        if (!listOfBrands.includes(car.name.brand)) {
            listOfBrands.push(car.name.brand)
        }
    })
}

fs.writeFileSync(
    "./Output/dropdownLists/brandList.json",
    JSON.stringify(listOfBrands)
)

// Sort List of Brands (!)
