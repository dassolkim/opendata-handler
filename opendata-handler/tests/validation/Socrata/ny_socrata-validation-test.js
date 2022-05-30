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
    const publisher = 'Socrata'
    const page = 1
    const urlInfo = {
        name: 'ny_catalog',
        type: 'url',
        format: format,
        publisher: publisher,
        page: page
    }
    const name = `ny_p${page}_csv_`
    // distribution name extraction
    const rUrls = fh.readUrls(dataDir, urlInfo)
    const urlObj = JSON.parse(rUrls)
    const count = urlObj.info.count
    console.log(`Number of ${format} file in ${publisher} portal catalog page ${urlInfo.page}: ${count}`)
    let i = 0
    const sourceList = []
    while (i < 100) {
        const url = urlObj.url[i]

        csvConnectSource.url = url
        csvConnectSource.dataset_name = name + i
        csvSourceInfo.name = name + i

        console.time('Time check for socrata validation')
        const sourceId = await validate.validate(csvSourceInfo)
        if (sourceId == null) {
            console.log("odlSource/validatdion failed")
        } else {
            sourceList.push(sourceId)
            console.log("odlSource/validation succeeded")
        }
        console.timeEnd('Time check for socrata validation')
        i++
    }
    urlInfo.count = i
    urlInfo.type = 'source'
    const writeSource = fh.writeSourceIds(sourceList, urlInfo)
    console.log(writeSource)
}
if (require.main == module) {
    main()
}