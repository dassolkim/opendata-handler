const config = require('../../config/openDataConfig')
const dc = require('./data-collector')
const fh = require('../fileHandler/file-handler')
const rp = require('../rdfParser/rdf-parser')
const path = require('path')
const defaultPath = path.join('C:/Users/kimds/nodeProject', 'data/')


module.exports = { downloadAllCatalog, downloadAllUrls }

/* const sourceInfo = {
    defaultUrl: config.USdefaultUrl,
    type: 'catalog',
    publisher: 'US',
    name: 'us_catalog'
} */

async function downloadAllCatalog(sourceInfo, end) {
    /**
     * Get all of US Catalog
     * US end: < 3436
     */

    for (let page = 1; page < end; page++) {
        const catalog = await dc.getNextCatalog(sourceInfo, page)
        console.log(`######### Collect ${sourceInfo.name}, page ${page} on Web (data portal) #########`)
        sourceInfo.page = page
        const file = await fh.writeCatalog(catalog, sourceInfo)
        // console.log(file)
        if (file) {
            console.log(`collecting and storing ${sourceInfo.name} page ${page} file is succeeded`)
        } else {
            console.log('storing file is failed')
        }

    }
}

async function downloadAllUrls(sourceInfo, format, end){

    const dataDir = defaultPath
    // const format = 'CSV'
    const urlInfo = {
        name: sourceInfo.name,
        type: 'url',
        format: format.toLowerCase(),
        publisher: sourceInfo.publisher
    }
    for (let page = 100; page < end; page++) {
        sourceInfo.page = page
        const catalog = await fh.readCatalog(dataDir, sourceInfo)

        if (!catalog) {
            console.log(`read data is failed`)
        } else {
            const parseData = await rp.catalogParser(catalog)
            const dataset = await rp.datasetParser(parseData)
            const urls = rp.distributionParser(parseData, format)
            if (page == 1) {
                const schema = rp.schemaParser(parseData)
                console.log(schema)
            }
            if (urls) {
                const count = urls.length
                const dataset_count = dataset.length
                console.log(`Number of datasets in catalog page ${page}: ${dataset_count}`)
                console.log(`number of csv files in catalog page ${page}: ${count}`)

                urlInfo.page = page
                urlInfo.count = count

                const wUrls = await fh.writeUrls(urls, urlInfo)
                if (wUrls) {
                    console.log(`write urls to files is succeeded`)
                }
            }
        }
    }
}


