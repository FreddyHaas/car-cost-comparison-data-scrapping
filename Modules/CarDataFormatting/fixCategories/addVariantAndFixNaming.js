const _500 = require("../../../Output/carDataFormatted/carDataFormatted_500.json")
const _1000 = require("../../../Output/carDataFormatted/carDataFormatted_1000.json")
const _1500 = require("../../../Output/carDataFormatted/carDataFormatted_1500.json")
const _2000 = require("../../../Output/carDataFormatted/carDataFormatted_2000.json")
const _2500 = require("../../../Output/carDataFormatted/carDataFormatted_2500.json")
const _3000 = require("../../../Output/carDataFormatted/carDataFormatted_3000.json")
const _3500 = require("../../../Output/carDataFormatted/carDataFormatted_3500.json")
const _4000 = require("../../../Output/carDataFormatted/carDataFormatted_4000.json")
const _4500 = require("../../../Output/carDataFormatted/carDataFormatted_4500.json")
const _5000 = require("../../../Output/carDataFormatted/carDataFormatted_5000.json")
const _5500 = require("../../../Output/carDataFormatted/carDataFormatted_5500.json")
const _End = require("../../../Output/carDataFormatted/carDataFormatted_End.json")

const fs = require("fs")

const idVariantList = require("../../../Output/carDataFormatted/carCategoriesInterimResults/idVariantList.json")

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

fileNames.forEach((fileName) => {
    files[fileName].forEach((car) => {
        // Add Variant to car naming
        car["name"]["variant"] = idVariantList[car.searchName.identifier]

        // Checke ob ADAC Modelname mit Name + Range beginnt - falls ja, Modellbezeichnung ableiten und speichern
        let rangeVariant = `${car["name"]["range"]} ${car["name"]["variant"]} `
        if (car["name"]["variant"] === "") {
            rangeVariant = `${car["name"]["range"]} `
        }
        if (
            car["name"]["modelName"].slice(0, rangeVariant.length) ===
            rangeVariant
        ) {
            car["name"]["modelNameShort"] = car["name"]["modelName"].slice(
                rangeVariant.length
            )
        } else {
            car["name"]["modelNameShort"] = car["name"]["modelName"]
        }

        // Entferne "(" am Anfang von Modelnamen
        if (car["name"]["modelNameShort"].slice(1) === "(") {
            car["name"]["modelNameShort"] = car["name"]["modelNameshort"].slice(
                1,
                -1
            )
        }
    })
    fs.writeFileSync(
        `./Output/carDataFormatted/carDataFormatted${fileName}.json`,
        JSON.stringify(files[fileName])
    )
})
