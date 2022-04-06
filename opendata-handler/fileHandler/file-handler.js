const fs = require('fs')
const dataDir = './data/'

module.exports = {writeCatalog, readCatalog, writeUrls, readUrls}

function writeCatalog(data, sourceInfo) {

    try{
        const type = sourceInfo.type
        const dir = dataDir + type
        console.log(`directory path: ${dir}`)
        // const exist = fs.existsSync(dir)
        // console.log(exist)
        // if (!exist) fs.mkdirSync(dir)
        
        const file = dir + '/' + sourceInfo.name + '.rdf'
        console.log(`file path: ${file}`)
        fs.writeFileSync(file, data)
        if(fs.existsSync(file)){
            return true
        } else {
            return false
        }
        
    } catch (err){
        console.log(err)
    }   
}


function readCatalog(dataDir, sourceInfo) {

    try{
        const type = sourceInfo.type
        const dir = dataDir + type
        const exist = fs.existsSync(dir)
        console.log(exist)
        console.log(`directory path: ${dir}`)
        const file = dir + '/' + sourceInfo.name + '.rdf'
        console.log(`file path: ${file}`)
        
        if(fs.existsSync(file)){
            const data = fs.readFileSync(file, 'utf-8')
            console.log(typeof(data))
            return data
        } else {
            return false
        }
        
    } catch (err){
        console.log(err)
    }   
}

function writeUrls(data, sourceInfo) {

    try{
        const type = sourceInfo.type
        const dir = dataDir + type
        console.log(`directory path: ${dir}`)
        const exist = fs.existsSync(dir)
        console.log(exist)
        const file = dir + '/' + sourceInfo.name + '_url.txt'
        console.log(`file path: ${file}`)
        const urls = {
            info: sourceInfo,
            url: data
        }
        fs.writeFileSync(file, JSON.stringify(urls))
        if(fs.existsSync(file)){
            return true
        } else {
            return false
        }
    } catch (err){
        console.log(err)
    }   
}

function readUrls(dataDir, sourceInfo) {

    try{
        const type = sourceInfo.type
        const dir = dataDir + type
        const exist = fs.existsSync(dir)
        console.log(exist)
        console.log(`directory path: ${dir}`)
        const file = dir + '/' + sourceInfo.name + '_url.txt'
        console.log(`file path: ${file}`)
        
        if(fs.existsSync(file)){
            const data = fs.readFileSync(file, 'utf-8')
            console.log(typeof(data))
            return data
        } else {
            return false
        }
        
    } catch (err){
        console.log(err)
    }   
}