const configInfo = require('../../../../config/connectConfig')
const create = require('../../../../airbyte-api-module/distribution/create/odl')
const fh = require('../../../fileHandler/file-handler')
const path = require('path')
const defaultPath = path.join('C:/Users/kimds/nodeProject', 'data/')


const destinationInfo = {
    defaultUrl: configInfo.defaultUrl,
    connectionConfiguration: configInfo.connectDestination,
    workspaceId: configInfo.workspaceId,
    destinationDefinitionId: configInfo.destinationDefinitionId,
    exist: true,
    destinationId: "1e386b8f-15a8-4709-8b20-10b248865328", //HPC02 airbyte us_dst
    name: "us_DST_1K_destination"
}
const connectionInfo = {
    defaultUrl: configInfo.defaultUrl,
    status: configInfo.status,
    operationId: configInfo.operationId,
    sync: true
}

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
    // const lastPage = 3435

    const urlInfo = {
        name: 'us_catalog',
        type: 'url',
        format: format,
        publisher: publisher,
        page: page
    }
    urlInfo.dirType = 1000
    const f_list = fh.readDirs(dataDir, urlInfo)
    const length = f_list.length

    console.time(`Time check for ${publisher} portal migration`)
    let p = 0
    let global_cnt = 0
    let global_fcnt = 0
    while (p < length) {
        urlInfo.page = f_list[p] // modify
        // const rSources = fh.readIdFile(dataDir, urlInfo, f_list[p])
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
            while (i < count) {
                const source = sourceObj.sourceList[i]
                if (source != undefined) {
                    // console.log(source)
                    sourceInfo.sourceId = source
                    const checkResult = await create.createWithSource(sourceInfo, destinationInfo, connectionInfo)

                    if (checkResult == true) {
                        cnt++
                        console.log("US DST: connection succeeded")
                    } else {
                        fcnt++
                        console.log("US DST: connection failed")
                    }
                }
                i++
            }
            global_cnt += cnt
            global_fcnt += fcnt
            console.log(`create and sync connection for ${publisher} workspace, #of connected sources: ${cnt}`)
        }
        p++
    }
    console.log(`Number of total succeeded migration: ${global_cnt}`)
    console.log(`Number of total failed migration: ${global_fcnt}`)
    console.timeEnd(`Time check for ${publisher} portal migration`)
}
if (require.main == module) {
    main()
}