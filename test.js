const config = require('./config/openDataConfig')
const dc = require('./opendata-handler/data-collector')

async function main(){
 
    const UKsourceInfo = {
        defaultUrl: config.UKdefaultUrl,
        name: 'uk_test'
    }
    const USAsourceInfo = {
        defaultUrl: config.USAdefaultUrl,
        name: 'usa_test'
    }

    /**
     * dstribution/create test
     */

    const catalog = await dc.getRDF(UKsourceInfo)
    console.log("######### Get RDF Files on Web #########")
    console.log(`Get RDF contents: ${catalog}`)

}
if (require.main == module){
    main()
}