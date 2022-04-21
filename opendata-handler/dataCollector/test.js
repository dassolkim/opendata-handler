const dc = require('./data-collector')
const config = require('../../config/openDataConfig')
const dd = require('./data-downloader')

async function test(){
    const USsourceInfo = {
        defaultUrl: config.USdefaultUrl,
        type: 'catalog',
        name: 'us_catalog',
        publisher: 'US'
    }
    /**
     * Get RDF Catalog Test
     */
    const catalog = await dc.getCatalog(USsourceInfo)
    console.log(`######### Collect ${USsourceInfo.name} on Web (data portal) #########`)
    console.log(catalog)
    
    // downloader test
    dd.downloadAllUrls(USsourceInfo, 'CSV', 120)
}

test()