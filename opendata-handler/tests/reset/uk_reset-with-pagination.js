const configInfo = require('../../../config/connectConfig')
const remove = require('../../../airbyte-api-module/distribution/remove/odl')

const fh = require('../../fileHandler/file-handler')
const path = require('path')
const defaultPath = path.join('C:/Users/kimds/nodeProject', 'data/')

async function main() {

    /**
     * odl-source/validation logic
     */
    // read urls in file
    const dataDir = defaultPath
    const format = 'csv'
    const publisher = 'UK'
    const page = 1
    const urlInfo = {
        name: 'uk_catalog',
        type: 'url',
        format: format,
        publisher: publisher,
        page: page
    }
    // distribution name extraction
    const lastPage = 521
    let p = 0
    let global_cnt = 0
    urlInfo.dirType = 100
    const f_list = fh.readDirs(dataDir, urlInfo)
    console.log(f_list)
    const length = f_list.length
    console.log(length)

    while (p < length) {
        // urlInfo.page = p
        // const rSources = fh.readSourceIds(dataDir, urlInfo)
        const rSources = fh.readIdFile(dataDir, urlInfo, f_list[p])
        if (rSources == false) {
            console.log(`${p} catalogs does not contain ${format} files`)
        } else {
            const sourceObj = JSON.parse(rSources)
            const count = sourceObj.info.count
            console.log(`Number of ${format} file in ${publisher} portal catalog page ${urlInfo.page}: ${count}`)

            let i = 0
            let cnt = 0
            console.time('Time check for US portal validation')
            while (i < count) {
                const source = sourceObj.sourceList[i]
                if (source != undefined) {
                    // console.log(source)
                    const removeResult = await remove.removeSource(configInfo.defaultUrl, source)
                    if (removeResult == true) {
                        cnt++
                        console.log("odlSource/reset succeeded")
                    } else {
                        console.log("odlSource/reset failed")
                    }
                }
                i++
            }
            global_cnt += cnt
            console.timeEnd('Time check for US portal validation')
            fh.removeIdFiles(dataDir, urlInfo, f_list[p])
            console.log(`reset ${publisher} workspace, #of deleted sources: ${cnt}`)
        }
        p++
    }
    console.log(`reset ${publisher} workspace, #of total deleted sources: ${global_cnt}`)

}
if (require.main == module) {
    main()
}