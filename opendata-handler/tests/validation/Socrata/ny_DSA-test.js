const configInfo = require('../../../../config/connectConfig')
const validate = require('../../../../airbyte-api-module/distribution/validate/odl')
const extractor = require('../../../dataExtractor/random-sampling')
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
    const limit = 1000
    let rp = []
    let cnt = 0
    while (true) {
        if(cnt == limit){
            break
        } else {
            const random = extractor.randomNum(200, 3017)
            if (rp.indexOf(random) === -1) {
                rp.push(random)
                cnt++
            }
        }
    }
    console.log(rp)
    // const rp = [76, 238, 249, 58]
    const rp_len = rp.length
    // console.log(rp)
    console.log(rp_len)

    console.time(`Time check for ${publisher} portal validation with random pagenation`)
    let global_cnt = 0
    let original_cnt = 0

    const pg = 1
    const name = `ny_p${pg}_${format}_`
    // distribution name extraction
    urlInfo.page = pg
    const rUrls = fh.readUrls(dataDir, urlInfo)

    const urlObj = JSON.parse(rUrls)
    const count = urlObj.info.count
    console.log(`Number of ${format} file in ${publisher} portal catalog page ${urlInfo.page}: ${count}`)
    let i = 0
    let j = 0
    let scnt = 0
    const sourceList = []
    original_cnt = rp_len
    while (i < rp_len) {
        const id = rp[i]
        const url = urlObj.url[id]
        j = id + 1
        csvConnectSource.url = url
        csvConnectSource.dataset_name = name + j
        csvSourceInfo.name = name + j

        const sourceId = await validate.validateWithoutDiscover(csvSourceInfo)
        if (sourceId == null) {
            console.log("odlSource/validatdion failed")
        } else {
            sourceList.push(sourceId)
            scnt++
        }
        i++
    }

    urlInfo.count = scnt
    global_cnt += scnt
    urlInfo.dataType = 'source'
    urlInfo.dirType = limit
    const writeSource = fh.writeSourceIds(sourceList, urlInfo)
    console.log(`create and validate for ODL data service activity`)
    console.log(`number of created sources in ${publisher}: ${scnt}`)
    console.log(writeSource)

    console.timeEnd(`Time check for ${publisher} portal validation with random pagenation`)
    console.log(`Number of ${format} files in ${publisher} portal: ${original_cnt}`)
    console.log(`Number of created sources in ${publisher} portal ${format} files: ${global_cnt}`)

}
if (require.main == module) {
    main()
}