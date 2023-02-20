const carDataRaw = require("../../Output/carDataRaw.json")

const dataCleaner = require("./cleaningSchema")
const fs = require("fs")

const carDataClean = []

// Clean data
carDataRaw.forEach((car) => {
    const cleanData = dataCleaner(car)
    carDataClean.push(cleanData)
})

// // Save data in file size of 500 items
const chunkSize = 500
const totalLength = carDataClean.length
console.log(totalLength)

for (let i = 0; i < totalLength; i += chunkSize) {
    const chunkEnd = i + chunkSize
    const cleanData = carDataClean.slice(i, chunkEnd)
    fs.writeFileSync(
        `./Output/carDataClean/carDataClean${chunkEnd}.json`,
        JSON.stringify(cleanData)
    )
}
