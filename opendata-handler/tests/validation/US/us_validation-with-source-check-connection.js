const configInfo = require('../../../../config/connectConfig')
const validate = require('../../../../airbyte-api-module/distribution/validate/odl')
const extractor = require('../../../dataExtractor/random-sampling')
const fh = require('../../../fileHandler/file-handler')
const path = require('path')
const defaultPath = path.join('C:/Users/kimds/nodeProject', 'data/')

async function main() {

    let sourceInfo = {
        defaultUrl: configInfo.defaultUrl
    }
    /**
     * odl-source/validation logic
     */
    // read urls in file
    const dataDir = defaultPath
    const format = 'csv'
    const publisher = 'US'
    const page = 1
    const lastPage = 3435

    const urlInfo = {
        name: 'us_catalog',
        type: 'url',
        format: format,
        publisher: publisher,
        page: page
    }

    console.time(`Time check for ${publisher} portal validation with check_connection`)
    let p = page
    let global_cnt = 0
    let global_fcnt = 0
    const pg_list = [3301, 978, 2887, 1013]
    while (p <= lastPage) {
        urlInfo.page = p
        const rSources = fh.readSourceIds(dataDir, urlInfo)
        if (rSources == false) {
            // continue
            console.log(`${p} catalogs does not contain ${format} files`)
        } else {
            const sourceObj = JSON.parse(rSources)
            const count = sourceObj.info.count
            console.log(`Number of ${format} file in ${publisher} portal catalog page ${urlInfo.page}: ${count}`)

            let i = 0
            let cnt = 0
            let fcnt = 0
            // console.time('Time check for US portal validation')
            while (i < count) {
                const source = sourceObj.sourceList[i]
                if (source != undefined) {
                    // console.log(source)
                    sourceInfo.sourceId = source
                    const checkResult = await validate.validateWithCheckConnection(sourceInfo)

                    if (checkResult == true) {
                        cnt++
                        console.log("odlSource/check_connection succeeded")
                    } else {
                        fcnt++
                        console.log("odlSource/check_connection failed")
                    }
                }
                i++
            }
            global_cnt += cnt
            global_fcnt += fcnt
            console.log(`check connection for ${publisher} workspace, #of connected sources: ${cnt}`)
        }
        p++
    }
    console.log(`Number of total connected sources: ${global_cnt}`)
    console.log(`Number of total failed connection sources: ${global_fcnt}`)
    console.timeEnd(`Time check for ${publisher} portal validation with check_connection`)
}
if (require.main == module) {
    main()
}