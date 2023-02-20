const _500 = require("../../../../Output/carDataFormatted/carDataFormatted_500.json")
const _1000 = require("../../../../Output/carDataFormatted/carDataFormatted_1000.json")
const _1500 = require("../../../../Output/carDataFormatted/carDataFormatted_1500.json")
const _2000 = require("../../../../Output/carDataFormatted/carDataFormatted_2000.json")
const _2500 = require("../../../../Output/carDataFormatted/carDataFormatted_2500.json")
const _3000 = require("../../../../Output/carDataFormatted/carDataFormatted_3000.json")
const _3500 = require("../../../../Output/carDataFormatted/carDataFormatted_3500.json")
const _4000 = require("../../../../Output/carDataFormatted/carDataFormatted_4000.json")
const _4500 = require("../../../../Output/carDataFormatted/carDataFormatted_4500.json")
const _5000 = require("../../../../Output/carDataFormatted/carDataFormatted_5000.json")
const _5500 = require("../../../../Output/carDataFormatted/carDataFormatted_5500.json")
const _End = require("../../../../Output/carDataFormatted/carDataFormatted_End.json")

const carList = _500.concat(
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
    _End
)

console.log(carList.length)
