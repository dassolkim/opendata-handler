const fs = require('fs')
const dataDir = './data/'

module.exports = {writeFile, readFile}

function writeFile(data, sourceInfo) {

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


function readFile(dataDir, sourceInfo) {

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