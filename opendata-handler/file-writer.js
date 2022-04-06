const fs = require('fs')
const dataDir = './data/'

module.exports = {makeFile}

function makeFile(data, sourceInfo) {

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