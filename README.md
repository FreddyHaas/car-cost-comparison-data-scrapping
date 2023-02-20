# Car cost comparison data scrapping

This project scrappes the cost data of more than 5.500 cars from the [ADAC website](https://www.adac.de/rund-ums-fahrzeug/autokatalog/marken-modelle/autosuche/). The data was used as an input for the car cost comparison project which can be found here:

-> [Github project](https://github.com/FreddyHaas/car-cost-comparison)

-> [Live preview](https://car-cost-comparison.vercel.app/)

The relevant files for data scrapping are in the Modules folder:

1. CarList: Loads list of available models
2. CarDataClean: Loads data per model and extracts relevant information
3. CarDataFormatting: Consolidates the data and tailors data storage to output formats
4. CarDropdownLists: Reduces data to names for dropdown lists

## Built with:

-   [Puppeteer](https://github.com/puppeteer/puppeteer)
-   [Cheerio](https://cheerio.js.org/)
-   [Axios](https://axios-http.com/docs/intro)
