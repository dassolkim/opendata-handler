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
        "dataset_name": "uk_portal_csv_test"
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
    const publisher = 'UK'
    const page = 1
    const lastPage = 521

    const urlInfo = {
        name: 'uk_catalog',
        type: 'url',
        format: format,
        publisher: publisher,
        page: page
    }

    // const rp = extractor.randomSamplingWithLimit(lastPage, dataDir, urlInfo, 500)
    // const rp = extractor.randomSamplingWithLimit(lastPage, dataDir, urlInfo, 100)
    // const rp = extractor.randomSampling(lastPage, dataDir, urlInfo)
    const rp = extractor.randomSamplingWithLimit(lastPage, dataDir, urlInfo, 2000)


    const rp_len = rp.length
    console.log(rp)
    console.log(rp_len)

    console.time(`Time check for ${publisher} portal validation with random pagenation`)
    let global_cnt = 0
    let original_cnt = 0
    for (let p = 0; p < rp_len; p++) {
        const pg = rp[p]
        const name = `uk_p${pg}_${format}_`
        // distribution name extraction
        urlInfo.page = pg
        const rUrls = fh.readUrls(dataDir, urlInfo)

        const urlObj = JSON.parse(rUrls)
        const count = urlObj.info.count
        console.log(`Number of ${format} file in ${publisher} portal catalog page ${urlInfo.page}: ${count}`)
        let i = 0
        let j = 0
        let cnt = 0
        const sourceList = []

        original_cnt += count
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


        urlInfo.count = cnt
        global_cnt += cnt
        urlInfo.dataType = 'source'
        const writeSource = fh.writeSourceIds(sourceList, urlInfo)
        console.log(`create and validate for ODL data service activity`)
        console.log(`number of created sources in ${publisher}: ${cnt}`)
        console.log(writeSource)
    }
    console.timeEnd(`Time check for ${publisher} portal validation with random pagenation`)
    console.log(`Number of ${format} files in ${publisher} portal: ${original_cnt}`)
    console.log(`Number of created sources in ${publisher} portal ${format} files: ${global_cnt}`)

    // console.log(`(${global_cnt}/${original_cnt}) * 100 %`)

}
if (require.main == module) {
    main()
}