const config = require('../../config/openDataConfig')
const dd = require('./data-downloader')
const path = require('path')
// const dataDir = path.join('C:/Users/kimds/nodeProject', 'data/')

async function ustest(){
    const USsourceInfo = {
        defaultUrl: config.USdefaultUrl,
        type: 'catalog',
        name: 'us_catalog',
        publisher: 'US'
    }
    /**
     * Get RDF Catalog Test
     */
    const catalog = await dd.downloadAllCatalog(USsourceInfo, 3436)
    console.log(`######### Collect ${USsourceInfo.name} on Web (data portal) #########`)
    console.log(catalog)
    
    // downloader test
    // add JSON extraction
    // const url = await dd.downloadAllUrls(USsourceInfo, 'CSV', 3436)
    const url = await dd.downloadAllUrls(USsourceInfo, 'JSON', 3436)

    return url
}

// ustest()

async function canadatest(){
    const CAsourceInfo = {
        defaultUrl: config.CAdefaultUrl,
        type: 'catalog',
        name: 'ca_catalog',
        publisher: 'CA'
    }
    /**
     * Get RDF Catalog Test
     */
    const catalog = await dd.downloadAllCatalog(CAsourceInfo, 320)
    console.log(`######### Collect ${CAsourceInfo.name} on Web (data portal) #########`)
    console.log(catalog)
    
    // downloader test
    const url = await dd.downloadAllUrls(CAsourceInfo, 'CSV', 320)
    // console.log(`######### Collect ${CAsourceInfo.name} on Web (data portal) #########`)
    return url
}

// canadatest()

async function uktest(){
    const UKsourceInfo = {
        defaultUrl: config.UKdefaultUrl,
        type: 'catalog',
        name: 'uk_catalog',
        publisher: 'UK'
    }
    /**
     * Get RDF Catalog Test
     */
    console.log(`######### Collect ${UKsourceInfo.name} on Web (data portal) #########`)
    const catalog = await dd.downloadAllCatalog(UKsourceInfo, 521)
    console.log(catalog)
    
    // downloader test
    console.log(`######### Collect ${UKsourceInfo.name} on Web (data portal) #########`)
    const url = await dd.downloadAllUrls(UKsourceInfo, 'CSV', 521)
    return url
}
uktest()

async function dkan_test(){
    const OKsourceInfo = {
        defaultUrl: config.OKdefaultUrl,
        type: 'catalog',
        name: 'ok_catalog',
        publisher: 'OK_dkan'
    }
    /**
     * Get RDF Catalog Test
     */
    console.log(`######### Collect ${OKsourceInfo.name} on Web (data portal) #########`)
    const catalog = await dd.downloadAllCatalog(OKsourceInfo, 5)
    console.log(catalog)
    
    // downloader test
    console.log(`######### Collect ${OKsourceInfo.name} on Web (data portal) #########`)
    const url = await dd.downloadAllUrls(OKsourceInfo, 'CSV', 5)
    return url
}

// dkan_test()

async function socrata_test(){
    const NYsourceInfo = {
        defaultUrl: config.NYdefaultUrl,
        type: 'catalog',
        name: 'ny_catalog',
        publisher: 'Socrata',
        page: 1
    }
    /**
     * Get RDF Catalog Test
     */
    // console.log(`######### Collect ${NYsourceInfo.name} on Web (data portal) #########`)
    // const catalog = await dd.downloadAllCatalog(NYsourceInfo, 1)
    // console.log(catalog)
    
    // downloader test
    console.log(`######### Collect ${NYsourceInfo.name} on Web (data portal) #########`)
    const url = await dd.downloadSocrataDataset(NYsourceInfo, 'JSON', 1)
    // const url = await dd.downloadSocrataDataset(NYsourceInfo, 'CSV', 1)

    return url
}
// socrata_test()