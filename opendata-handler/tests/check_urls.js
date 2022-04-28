const fh = require('../fileHandler/file-handler')
const path = require('path')
const { url } = require('inspector')
const defaultPath = path.join('C:/Users/kimds/nodeProject', 'data/')

async function main(){

    const dataDir = defaultPath
    const format = 'CSV'
    const CAurlInfo = {
        name: 'ca_catalog',
        type: 'url',
        format: format.toLowerCase(),
        publisher: 'CA'
    }

    const USurlInfo = {
        name: 'us_catalog',
        type: 'url',
        format: format.toLowerCase(),
        publisher: 'US'
    }
    const CAend = 5
    const USend = 3435
    let total_count = 0
    const urlInfo = CAurlInfo
    for (let page = 1; page <= CAend; page++) {
        urlInfo.page = page
        const urls = await fh.readUrls(dataDir, urlInfo)

        if (!urls) {
            console.log(`read data is failed`)
        } else {
            const urlObj = JSON.parse(urls)
            const count = urlObj.info.count
            total_count += count
            
        }
    }
    console.log(`total ${format.toLowerCase()} files in ${urlInfo.publisher} open data portal page 1-5: ${total_count}`)

}

if (require.main == module){
    main()
}


async function checkFiles(sourceInfo, format, end){

    const dataDir = defaultPath
    // const format = 'CSV'
    const urlInfo = {
        name: sourceInfo.name,
        type: 'url',
        format: format.toLowerCase(),
        publisher: sourceInfo.publisher
    }
    let total_count = 0
    for (let page = 1; page < end; page++) {
        sourceInfo.page = page
        const urls = await fh.readUrls(dataDir, sourceInfo)

        if (!urls) {
            console.log(`read data is failed`)
        } else {
            const count = urls.info.count
            total_count += count
            
        }
    }
    console.log(`total ${format.toLowerCase()} files in ${sourceInfo.publisher} open data portal: ${total_count}`)
    return total_count
}