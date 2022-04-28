const config = require('../../config/openDataConfig')
const dc = require('../dataCollector/data-collector')
const fh = require('../fileHandler/file-handler')
const rp = require('../rdfParser/rdf-parser')
const path = require('path')
const defaultPath = path.join('C:/Users/kimds/nodeProject', 'data/')

async function main(){
 
    const UKsourceInfo = {
        defaultUrl: config.UKdefaultUrl,
        type: 'catalog',
        publisher: 'UK',
        name: 'uk_catalog'
    }
    const USsourceInfo = {
        defaultUrl: config.USdefaultUrl,
        type: 'catalog',
        publisher: 'US',
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
    const dataDir = defaultPath
    const format = 'CSV'
    const fileData = fh.readCatalog(dataDir, USsourceInfo)
    
    if(fileData == false){
        console.log(`read data is failed`)
    } else {
        const parseData = rp.catalogParser(fileData)
        const dataset = rp.datasetParser(parseData)
        const csv_urls = rp.distributionParser(parseData, format)
        const schema = rp.schemaParser(catalog)
        console.log(schema)
        const nextPageUrl = schema.nextPage
        const lastPage = schema.totalItem / 100
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