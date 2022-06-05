const fh = require('../fileHandler/file-handler')
const path = require('path')
const defaultPath = path.join('C:/Users/kimds/nodeProject', 'data/')

async function main() {

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

    const OKurlInfo = {
        name: 'ok_catalog',
        type: 'url',
        format: format.toLowerCase(),
        publisher: 'OK_dkan'
    }

    const NYurlInfo = {
        name: 'ny_catalog',
        type: 'url',
        format: format.toLowerCase(),
        publisher: 'Socrata'
    }

    const UKurlInfo = {
        name: 'uk_catalog',
        type: 'url',
        format: format.toLowerCase(),
        publisher: 'UK'
    }

    const CAend = 319
    const USend = 3435
    const OKend = 5
    const NYend = 1
    const UKend = 520
    let total_count = 0
    const urlInfo = NYurlInfo
    const end = NYend
    let remove = 0
    for (let page = 1; page <= end; page++) {
        urlInfo.page = page
        const urls = await fh.readUrls(dataDir, urlInfo)

        if (!urls) {
            console.log(`read data is failed`)
        } else {
            const urlObj = JSON.parse(urls)
            const urlList = urlObj.url
            const count = urlList.length
            // console.log(urlList.length)
            // console.log(typeof (urlList))
            console.log(count)
            for (let i = 0; i < count; i++) {
                const url = urlList[i]
                if (url.endsWith('.pdf') || url.endsWith('.zip')) {
                    remove++
                    console.log(url)
                    // console.log(i)
                    // urlList.pop(url)
                    urlList[i] = null
                }
            }
            let new_cnt = 0
            
            if (remove != 0) {
                let newList = []
                let a = 0
                for (let j = 0; j < urlList.length; j++) {
                    if (urlList[j] != null) {
                        newList[a] = urlList[j]
                        a++
                    }
                }
                new_cnt = newList.length
                urlInfo.page = page
                urlInfo.count = new_cnt

                const wUrls = await fh.writeUrls(newList, urlInfo)
                // console.log(wUrls)
                if (wUrls) {
                    console.log(`write urls to files is succeeded`)
                }
            } else {
                new_cnt = count
            }
            total_count += new_cnt
            console.log(`Count of newList in ${urlInfo.publisher} page ${page}: ${new_cnt}`)
        }
    }
    console.log(`total ${format.toLowerCase()} files in ${urlInfo.publisher} open data portal page 1-${end}: ${total_count}`)
}

if (require.main == module) {
    main()
}