// Assumption: Cost for car care (250 EUR per year) and lump sum fixed costs (200 EUR per year) excluded from ADAC

function cleanCarData(carData) {
    const CAR_CARE = 250 // Cost for care (EUR per year) included in ADAC's operational cost
    const OTHER_FIX = 200 // Lump sum cost (EUR per year) included in ADAC's fixed cost

    const {
        brand,
        range,
        generation,
        competitors,
        basicData,
        technicalData,
        costs,
    } = carData.result.carPage

    // HELPER FUNCTION: Create competitors array
    function createCompetitorsArray() {
        const competitorsArray = []
        if (competitors !== null) {
            competitors.forEach((competitor) => {
                const competitorData = {
                    name: competitor.name,
                    brandSearch: competitor.brandSlug,
                    rangeSearch: competitor.rangeSlug,
                }
                competitorsArray.push(competitorData)
            })
        } else {
            console.log(
                brand.slug,
                range.slug,
                generation.slug,
                basicData.carId
            )
        }
        return competitorsArray
    }

    // HELPER FUNCTION: Create cost array
    function createCostArray() {
        const costArray = []

        costs.costs.forEach((costItem) => {
            const taxMonthly = Math.round(parseInt(costs.tax) / 12)
            const fuel =
                parseInt(costItem.operational) - Math.round(CAR_CARE / 12) // Convert care costs to month
            const insurance =
                parseInt(costItem.fix) - Math.round(OTHER_FIX / 12) - taxMonthly // Convert lump sum fix costs to month
            const deterioration = parseInt(costItem.deterioration)
            const repairAndMaintenance = parseInt(costItem.workshop)

            const totalCost =
                deterioration +
                fuel +
                insurance +
                taxMonthly +
                repairAndMaintenance

            const costData = {
                months: costItem.months,
                kilometers: costItem.kilometers,
                deterioration: deterioration,
                fuel: fuel,
                insurance: insurance,
                tax: taxMonthly,
                repairAndMaintenance: repairAndMaintenance,
                total: totalCost,
            }
            costArray.push(costData)
        })

        return costArray
    }

    // HELPER FUNCTION:

    function extractModelNameShort() {
        const rangeNameLength = basicData.rangeName.length + 1
        return basicData.modelName.slice(rangeNameLength)
    }

    const modelNameShortValue = extractModelNameShort()

    const competitorsArray = createCompetitorsArray()

    const costArray = createCostArray()

    // MAIN FUNCTION: Create output format of data

    const carDataModified = {
        name: {
            brand: brand.name,
            range: range.name,
            generation: generation.name,
            modelName: basicData.modelName,
            modelNameShort: modelNameShortValue,
            carName: basicData.car,
            type: basicData.type,
        },
        searchName: {
            name: brand.slug,
            range: range.slug,
            generation: generation.slug,
            identifier: basicData.carId,
        },
        basicData: {
            basePrice: basicData.basePrice,
            modelStart: technicalData[0].data[5].value,
            generationStart: technicalData[0].data[7].value,
        },
        technicalData: {
            powerInKW: basicData.powerInKW,
            powerInHP: parseInt(basicData.powerInHP),
            displacement: basicData.displacement,
            motorType: technicalData[1].data[0].value,
            drivetrain: technicalData[1].data[8].value,
            gearBox: technicalData[1].data[9].value,
        },
        size: {
            bodyType: technicalData[3].data[0].value,
            doors: technicalData[3].data[1].value,
            class: technicalData[3].data[3].value,
            seats: technicalData[3].data[4].value,
            seatsMax: technicalData[3].data[5].value,
        },
        consumption: {
            fuelType: basicData.fuelType,
            consumptionNEFZ: technicalData[4].data[12].value,
            consumptionNEFZsecond: technicalData[4].data[13].value,
            consumptionWLTP: technicalData[4].data[20].value,
            consumptionWLTPsecond: technicalData[4].data[21].value,
        },
        warranty: {
            vehicle: technicalData[6].data[0].value,
            other: technicalData[6].data[4].value,
        },
        competitors: [...competitorsArray],
        insuranceAndTax: {
            tax: costs.tax,
            taxExemption: costs.taxExemption,
            insuranceClassLiability: costs.insuranceClassLiability,
            insuranceClassPartialCover: costs.insuranceClassPartialCover,
            insuranceClassComprehensiveCover:
                costs.insuranceClassComprehensiveCover,
            insurancePremiumLiability: costs.insurancePremiumLiability,
            insurancePremiumPartialCover: costs.insurancePremiumPartialCover,
            insurancePremiumComprehensiveCover:
                costs.insurancePremiumComprehensiveCover,
        },
        costs: [...costArray],
    }

    return carDataModified
}

module.exports = cleanCarData
