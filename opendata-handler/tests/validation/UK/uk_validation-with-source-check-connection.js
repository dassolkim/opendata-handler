const configInfo = require('../../../../config/connectConfig')
const validate = require('../../../../airbyte-api-module/distribution/validate/odl')
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

    let p = 0
    let global_cnt = 0
    let global_fcnt = 0

    urlInfo.dirType = 100
    const f_list = fh.readDirs(dataDir, urlInfo)
    const length = f_list.length
 
    console.time(`Time check for ${publisher} portal validation with check_connection`)

    while (p < length) {
        // urlInfo.page = p
        // const rSources = fh.readSourceIds(dataDir, urlInfo)
        const rSources = fh.readIdFile(dataDir, urlInfo, f_list[p])

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
        
            while (i < count) {
                const source = sourceObj.sourceList[i]
                if (source != undefined) {
       
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