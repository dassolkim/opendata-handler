const axios = require('axios').default

// shared api
module.exports = {getCatalog, getDataset}
// module.exports = {createSource, getSource, discoverSource, deleteSource}
function getCatalog(sourceInfo) {
    const url = sourceInfo.defaultUrl + "catalog.rdf"
    // const body = {
    //     workspaceId: sourceInfo.workspaceId,
    //     sourceDefinitionId: sourceInfo.sourceDefinitionId,
    //     connectionConfiguration: sourceInfo.connectionConfiguration,
    //     name: sourceInfo.name
    // }
    const result = axios.post(url)
    .then(function (response){
        const data = response.data
        return data

    }).catch(function (error){
        console.log(error)
    })
    return result
}

function getDataset(sourceInfo){
    const url = sourceInfo.defaultUrl + ".rdf"
    // const body = {
    //     sourceId: sourceId
    // };
    const result = axios.post(url)
    .then(function (response){
        const data = response.data
        return data

    }).catch(function (error){
        console.log(error)
    })
    return result
}