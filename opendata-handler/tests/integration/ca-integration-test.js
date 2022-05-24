const configInfo = require('../../config/connectConfig')
const validate = require('../../airbyte-api-module/distribution/validate/validate')
const create = require('../../airbyte-api-module/distribution/create/odl')
const fh = require('../fileHandler/file-handler')
const path = require('path')
const defaultPath = path.join('C:/Users/kimds/nodeProject', 'data/')

async function main(){
   
    let csvConnectSource = {
        "url": "https://data.cityofnewyork.us/api/views/wutj-3rsj/rows.csv?accessType=DOWNLOAD",
        "format": "csv",
        "provider": {
            "storage": "HTTPS"
        },
        "dataset_name": "ca_portal_csv_test"
    }

    let csvSourceInfo = {
        defaultUrl: configInfo.defaultUrl,
        connectionConfiguration: csvConnectSource,
        workspaceId: configInfo.workspaceId,
        sourceDefinitionId: configInfo.csvSourceDefinitnionId,
        // name: "us_p1_csv_"
    }
    const destinationInfo = {
        defaultUrl: configInfo.defaultUrl,
        connectionConfiguration: configInfo.connectDestination,
        workspaceId: configInfo.workspaceId,
        destinationDefinitionId: configInfo.destinationDefinitionId,
        exist: true,
        destinationId: "c1adcb5b-7283-4abe-ae8c-99905702a5dc"
        // CA_destination ID page 1-3: 5a4284a6-49ca-4c3e-b43b-3060d3cebb8b
        // CA page 4-5: 8ebaf4b0-8031-4839-838d-d52d0e6f6efd
        // CA page 6-7: c1adcb5b-7283-4abe-ae8c-99905702a5dc
        // name: "createTest_destination"
    }
    const connectionInfo = {
        defaultUrl: configInfo.defaultUrl,
        status: configInfo.status,
        operationId: configInfo.operationId,
        sync: true
    }
    
    /**
     * dstribution/create test
     */
    const dbType = 'file'
    
     
    if(dbType == 'file'){
        // read urls in file
        const dataDir = defaultPath
        const format = 'csv'
        const publisher = 'OK_dkan'
        const page = 6
        const urlInfo = {
            name: 'ok_catalog',
            type: 'url',
            format: format,
            publisher: publisher,
            page: page
        }
        const name = `ca_p${page}_csv_`
        // distribution name extraction
        const rUrls = fh.readUrls(dataDir, urlInfo)
        // console.log(rUrls)
        // console.log(typeof(rUrls))
        const urlObj = JSON.parse(rUrls)
        // console.log(typeof(urlObj))
        // console.log(urlObj)
        const count = urlObj.info.count
        console.log(`Number of ${format} file in ${publisher} portal catalog page ${urlInfo.page}: ${count}`)
        let i = 1
        while(i<=count){
            if(i%1 == 0){
                const url = urlObj.url[i]
                if (url.includes('.zip') != true){
                    csvConnectSource.url = url
                    csvConnectSource.dataset_name = name + i
                    csvSourceInfo.name = name + i
                    // const catalog = await validate.validate(csvSourceInfo)
                    // console.log("######### CSV File to Postgres Migration Test #########")
                    // console.log(`Validate results: ${catalog}`)
                    const connection = await create.create(csvSourceInfo, destinationInfo, connectionInfo)
                    if (connection == true){
                        console.log("distribution/create succeeded")
                    } else {
                        console.log("distribution/create failed")
                    }
                }
            }
            i++
        }
    } else {
        let catalog = await validate.validate(dbSourceInfo)
        const drop = ["covid_data"]
        const choiceData = await create.choice(catalog, drop)
        console.log("######### Postgres to Postgres Migration Test with table selection #########")
        console.log(`Validate results: ${choiceData}`)
        const connection = await create.create(dbSourceInfo, destinationInfo, connectionInfo, choiceData)
        if (connection == true){
            console.log("distribution/create succeeded")
        } else {
            console.log("distribution/create failed")
        }
    }
}
if (require.main == module){
    main()
}