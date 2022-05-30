const fh = require('../fileHandler/file-handler')

module.exports = { randomSampling, randomSamplingWithLimit }

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
            if (count == 0) {
                randomList.pop(random)
            } else {
                cnt += count
                if (cnt < 1000) {
                    // cnt += count
                    continue
                } else {
                    console.log(`Number of files in random list: ${cnt}`)
                    // console.log(randomList)
                    break
                }
            }
        }
    }
    // console.log(``)
    return randomList
}

function randomSamplingWithLimit(end, dataDir, urlInfo, limit) {

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
            if (count == 0) {
                randomList.pop(random)
            } else if (count > limit * 1.5 || count < limit * 0.5) {
                randomList.pop(random)
            } else {
                cnt += count
                if (limit <= cnt <= limit + (limit * 0.2)) {
                    console.log(`Number of files in random list: ${cnt}`)
                    break
                } else {
                    continue
                    // randomList.pop(random)
                    // console.log(randomList)
                    // break
                }
            }
        }
    }
    // console.log(``)
    return randomList
}