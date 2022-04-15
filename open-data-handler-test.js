const config = require('./config/openDataConfig')
const dc = require('./opendata-handler/dataCollector/data-collector')
const fh = require('./opendata-handler/fileHandler/file-handler')
const rp = require('./opendata-handler/rdfParser/rdf-parser')

async function main(){
 
    const UKsourceInfo = {
        defaultUrl: config.UKdefaultUrl,
        type: 'catalog',
        name: 'uk_catalog'
    }
    const USsourceInfo = {
        defaultUrl: config.USdefaultUrl,
        type: 'catalog',
        name: 'us_catalog'
    }

    /**
     * Get RDF Catalog Test
     */

    const catalog = await dc.getCatalog(USsourceInfo)
    console.log(`######### Collect ${USsourceInfo.name} on Web (data portal) #########`)
    //console.log(`Get RDF contents: ${catalog}`)
    //console.log(typeof(catalog)) // string
    //console.log(JSON.parse(catalog))   // error: < 
    const file = fh.writeCatalog(catalog, USsourceInfo)
    console.log(file)
    if (file) {
        console.log(`collecting and storing ${USsourceInfo.name} file is succeeded`)
    } else{
        console.log('storing file is failed')
    }

    // UK test file read
    const dataDir = './data/'
    const format = 'CSV'
    const fileData = fh.readCatalog(dataDir, USsourceInfo)
    
    if(fileData == false){
        console.log(`read data is filed`)
    } else {
        const parseData = rp.catalogParser(fileData)
        const dataset = rp.datasetParser(parseData)
        const csv_urls = rp.distributionParser(parseData, format)
        //const dist = test['rdf:RDF']['dcat:Distribution']
        //console.log(JSON.stringify(dist, null, 2))
        const csv_count = csv_urls.length
        const dataset_count = dataset.length
        console.log(`Number of datasets in catalog: ${dataset_count}`)
        console.log(`number of csv files in catalog: ${csv_count}`)
        console.log(`csv urls in catalog: ${csv_urls}`)
        const urlInfo = {
            name: USsourceInfo.name,
            type: 'url',
            format: format,
            count: csv_count
        }
        const wUrls = fh.writeUrls(csv_urls, urlInfo)
        if(wUrls){
            console.log(`write urls to files is succeede`)
        }
        const rUrls = fh.readUrls(dataDir, urlInfo)
        console.log(rUrls)
    }
}
if (require.main == module){
    main()
}