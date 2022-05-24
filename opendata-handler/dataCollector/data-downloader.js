// const config = require('../../config/openDataConfig')
const dc = require('./data-collector')
const fh = require('../fileHandler/file-handler')
const rp = require('../rdfParser/rdf-parser')
const path = require('path')
const { count } = require('console')
const defaultPath = path.join('C:/Users/kimds/nodeProject', 'data/')


module.exports = { downloadAllCatalog, downloadAllUrls, downloadSocrataDataset }

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
    if (sourceInfo.publisher == "Socrata") {
        const catalog = await dc.getSocrata(sourceInfo)
        console.log(`######### Collect ${sourceInfo.name}, page ${end} on Web (data portal) #########`)
        sourceInfo.page = end
        const dump = JSON.stringify(catalog)
        // console.log(dump)
        // imeplements socrata pagenation

        const file = await fh.writeCatalog(dump, sourceInfo)
        if (file) {
            console.log(`collecting and storing ${sourceInfo.name} file is succeeded`)
        } else {
            console.log('storing file is failed')
        }

    } else {
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
}

async function downloadAllUrls(sourceInfo, format, end) {

    const dataDir = defaultPath
    // const format = 'CSV'
    const urlInfo = {
        name: sourceInfo.name,
        type: 'url',
        format: format.toLowerCase(),
        publisher: sourceInfo.publisher
    }
    let total_count = 0
    for (let page = 1; page < end; page++) {
        sourceInfo.page = page
        const catalog = await fh.readCatalog(dataDir, sourceInfo)

        if (!catalog) {
            console.log(`read data is failed`)
        } else {
            const parseData = await rp.catalogParser(catalog)
            // console.log(parseData)
            const dataset = await rp.datasetParser(parseData)
            const urls = await rp.distributionParser(parseData, format)
            // console.log(urls)
            if (page == 1) {
                const schema = rp.schemaParser(parseData)
                console.log(schema)
            }
            if (urls) {
                const count = urls.length
                const dataset_count = dataset.length
                console.log(`Number of datasets in catalog page ${page}: ${dataset_count}`)
                console.log(`number of csv files in catalog page ${page}: ${count}`)
                total_count += count
                urlInfo.page = page
                urlInfo.count = count

                const wUrls = await fh.writeUrls(urls, urlInfo)
                if (wUrls) {
                    console.log(`write urls to files is succeeded`)
                }
            }
        }
    }
    console.log(`total ${format.toLowerCase()} files in ${sourceInfo.publisher} open data portal: ${total_count}`)
    return total_count
}

async function downloadSocrataDataset(sourceInfo, format, page) {

    const dataDir = defaultPath
    const urlInfo = {
        name: sourceInfo.name,
        type: 'url',
        format: format.toLowerCase(),
        publisher: sourceInfo.publisher
    }

    console.log(`######### Collect ${sourceInfo.name} on Web (data portal) #########`)
    const catalog = await fh.readCatalog(dataDir, sourceInfo)
    let total_count
    if (!catalog) {
        console.log(`read data is failed`)
    } else {
        const parseData = JSON.parse(catalog)
        const dataset = parseData.dataset
        const dataset_count = dataset.length
        const dist_list = rp.socrataDatasetParser(parseData)

        const url_list = []
        let j = 0
        let socrata_format
        // let dist
        if (format == 'CSV') socrata_format = 'text/csv'

        let k = 0
        while (k < dataset_count) {
            const di = dist_list[k]
            if (di != undefined) {
                const dc = di.length
                for (let i = 0; i < dc; i++) {
                    const d = di[i]
                    if (d != undefined) {
                        if (d["mediaType"] == socrata_format) {
                            url_list[j] = d['downloadURL']
                            j++
                        }
                    }
                }
            }
            k++
        }
        if (url_list) {
            const count = url_list.length
            console.log(`Number of datasets in socrata catalog: ${dataset_count}`)
            console.log(`number of csv files in socrata catalog: ${count}`)
            urlInfo.count = count
            urlInfo.page = page
            total_count = count

            const wUrls = await fh.writeUrls(url_list, urlInfo)
            if (wUrls) {
                console.log(`write urls to files is succeeded`)
            }
        }
    }
    console.log(`total ${format.toLowerCase()} files in ${sourceInfo.publisher} open data portal: ${total_count}`)
    return total_count
}