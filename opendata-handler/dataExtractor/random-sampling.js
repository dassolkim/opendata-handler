const fh = require('../fileHandler/file-handler')

module.exports = { randomSampling }

function randomSampling(end, dataDir, urlInfo) {

    const randomList = []
    let cnt = 0

    while (true) {
        const random = Math.floor(Math.random() * end + 1)
        if (randomList.indexOf(random) === -1) {
            randomList.push(random)
        }
        urlInfo.page = random
        const rUrls = fh.readUrls(dataDir, urlInfo)
        if (rUrls == false) {
            console.log(`Zero ${urlInfo.format} files in catalog page ${urlInfo.page}`)
            randomList.pop(random)
        } else {
            const urlObj = JSON.parse(rUrls)
            const count = urlObj.info.count
            if (cnt < 2000) {
                cnt += count
            } else {
                console.log(`Number of files in random list: ${cnt}`)
                console.log(randomList)
                break
            }
        }
    }
    return randomList
}