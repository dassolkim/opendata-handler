const config = require('./config/openDataConfig')
const dc = require('./opendata-handler/data-collector')
const mf = require('./opendata-handler/file-writer')

async function main(){
 
    const UKsourceInfo = {
        defaultUrl: config.UKdefaultUrl,
        type: 'catalog',
        name: 'uk_catalog'
    }
    const USAsourceInfo = {
        defaultUrl: config.USAdefaultUrl,
        type: 'catalog',
        name: 'us_catalog'
    }

    /**
     * dstribution/create test
     */

    const catalog = await dc.getCatalog(UKsourceInfo)
    console.log(`######### Collect ${UKsourceInfo.name} on Web (data portal) #########`)
    const file = await mf.makeFile(catalog, UKsourceInfo)
    console.log(file)
    if (file) {
        console.log('collecting and storing catalog if succeeded')
    } else{
        console.log('storing file is failed')
    }
    // console.log(`Get RDF contents: ${catalog}`)

}
if (require.main == module){
    main()
}