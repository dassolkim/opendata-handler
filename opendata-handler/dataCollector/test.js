const dc = require('./data-collector')
const config = require('../../config/openDataConfig')

async function test(){
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
    console.log(catalog)
}

test()

