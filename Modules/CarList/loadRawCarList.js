const puppeteer = require("puppeteer")
const fs = require("fs").promises

const outputList = []

async function loadCarList() {
    // Launch new browser
    const browser = await puppeteer.launch({
        headless: false,
    })
    const page = await browser.newPage()

    // Get all xhr/fetch responses when loading page
    page.on("response", async (response) => {
        if (response.request().resourceType() == "xhr") {
            const output = await response.json()
            // Select only
            if (output.data.carSearch !== undefined) {
                outputList.push(output)
            }
        }
    })

    for (let i = 1; i < 26; i++) {
        await page.goto(
            `https://www.adac.de/rund-ums-fahrzeug/autokatalog/marken-modelle/autosuche/?newCarsOnly=true&pageNumber=${i}&costPerMonth.min=213&costPerMonth.max=3500`,
            {
                waitUntil: "networkidle2",
            }
        )
    }

    fs.writeFile("./Output/carListRaw.json", JSON.stringify(outputList))

    browser.close()
}

loadCarList()
