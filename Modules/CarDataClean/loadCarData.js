const axios = require("axios")
const cheerio = require("cheerio")
const fs = require("fs")
const carList = require("") // INSERT RELEVANT LIST HERE - ideally in smaller chunks

const promises = []
const carData = []
const errorDataType = []
const errorDataAxios = []

const noOfCars = carList.length

async function loadAllCarData() {
    for (let car = 0; car < noOfCars; car++) {
        const { brand, range, generation, id } = carList[car]
        promises.push(loadDataPerCar(brand, range, generation, id))
        if (car % 50 === 0) {
            console.log(car)
        }
        await pauseLoop(1000)
    }

    // Wait until all data is loaded and save in file
    await Promise.allSettled(promises)
    fs.writeFileSync("./Output/carDataRawEnd_B.json", JSON.stringify(carData))
    fs.writeFileSync(
        "./Output/carDataErrorsEnd_type_A.json",
        JSON.stringify(errorDataType)
    )
    fs.writeFileSync(
        "./Output/carDataErrorsEnd_axios_B.json",
        JSON.stringify(errorDataAxios)
    )
}

async function loadDataPerCar(brand, range, generation, id) {
    let URL = `https://www.adac.de/rund-ums-fahrzeug/autokatalog/marken-modelle/${brand}/${range}/${generation}/${id}/`

    try {
        const response = await axios(URL, { timeout: 20000 })
        const $ = cheerio.load(response.data)
        $("script").each((index, element) => {
            // Extract relevant output from HTML page - relevant Data is always stored at 5th script tag
            if (index === 5) {
                const output = $(element).text().trim()

                const cleanedOutput = output.slice(24, -1) // Remove unnecessary text

                const outputObject = eval(`(${cleanedOutput})`) // Convert from string to object

                const relevantData =
                    outputObject["ROOT_QUERY"][
                        `page({"path":"/rund-ums-fahrzeug/autokatalog/marken-modelle/${brand}/${range}/${generation}/${id}/"})`
                    ]

                carData.push(relevantData)
            }
        })
    } catch (err) {
        console.log(err)
        if (err.name !== "AxiosError") {
            errorDataType.push({ brand, range, generation, id, err })
        } else {
            errorDataAxios.push({ brand, range, generation, id, err })
        }
    }
}

async function pauseLoop(ms) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(true), ms)
    })
}

loadAllCarData()
