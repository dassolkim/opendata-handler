const configInfo = require('../../../../config/connectConfig')
const validate = require('../../../../airbyte-api-module/distribution/validate/odl')

const fh = require('../../../fileHandler/file-handler')
const path = require('path')
const defaultPath = path.join('C:/Users/kimds/nodeProject', 'data/')

async function main() {

    let csvConnectSource = {
        "url": "https://data.cityofnewyork.us/api/views/wutj-3rsj/rows.csv?accessType=DOWNLOAD",
        "format": "csv",
        "provider": {
            "storage": "HTTPS"
        },
        "dataset_name": "ny_portal_csv_test"
    }

    let csvSourceInfo = {
        defaultUrl: configInfo.defaultUrl,
        connectionConfiguration: csvConnectSource,
        workspaceId: configInfo.workspaceId,
        sourceDefinitionId: configInfo.csvSourceDefinitnionId,
        // name: "us_p1_csv_"
    }

    /**
     * odl-source/validation logic
     */
    // read urls in file
    const dataDir = defaultPath
    const format = 'csv'
    const publisher = 'US'
    const page = 1
    const urlInfo = {
        name: 'us_catalog',
        type: 'url',
        format: format,
        publisher: publisher,
        page: page
    }
    const name = `us_p${page}_csv_`
    // distribution name extraction
    const rUrls = fh.readUrls(dataDir, urlInfo)
    const urlObj = JSON.parse(rUrls)
    const count = urlObj.info.count
    console.log(`Number of ${format} file in ${publisher} portal catalog page ${urlInfo.page}: ${count}`)
    let i = 0
    let j = 0
    let cnt = 0
    const sourceList = []
    console.time('Time check for US portal validation')
    while (i < count) {
        const url = urlObj.url[i]
        j = i + 1
        csvConnectSource.url = url
        csvConnectSource.dataset_name = name + j
        csvSourceInfo.name = name + j

        const sourceId = await validate.validateWithoutDiscover(csvSourceInfo)
        if (sourceId == null) {
            console.log("odlSource/validatdion failed")
        } else {
            sourceList.push(sourceId)
            cnt++
            // console.log("odlSource/validation succeeded")
        }
        i++
    }
    console.timeEnd('Time check for US portal validation')

    urlInfo.count = cnt
    urlInfo.dataType = 'source'
    const writeSource = fh.writeSourceIds(sourceList, urlInfo)
    console.log(`create and validate for ODL data service activity`)
    console.log(`number of created sources in ${publisher}: ${cnt}`)
    console.log(writeSource)
}
if (require.main == module) {
    main()
}