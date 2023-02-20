const brandList = require("../../../Output/dropdownLists/brandList.json")
const brandRangeList = require("../../../Output/dropdownLists/brandRangeList.json")
const rangeModelList = require("../../../Output/dropdownLists/rangeModelList.json")

let noOfRanges = 0
let noOfVariants = 0
let noOfModels = 0

brandList.forEach((brand) => {
    noOfRanges += brandRangeList[brand].length

    brandRangeList[brand].forEach((range) => {
        rangeName = brand + " " + range

        const variants = Object.keys(rangeModelList[rangeName])

        noOfVariants += variants.length

        variants.forEach((variant) => {
            noOfModels += rangeModelList[rangeName][variant].length
        })
    })
})

console.log("Brands: " + brandList.length)
console.log("Ranges: " + noOfRanges)
console.log("Variants: " + noOfVariants)
console.log("Models: " + noOfModels)
