const axios = require('axios').default

// shared api
module.exports = {getRDF}
// module.exports = {createSource, getSource, discoverSource, deleteSource}
function getRDF(sourceInfo) {
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

function getSource(defaultUrl, sourceId){
    const url = defaultUrl + "sources/get"
    const body = {
        sourceId: sourceId
    };
    const result = axios.post(url, body)
    .then(function (response){
        const data = response.data
        return data

    }).catch(function (error){
        console.log(error)
    })
    return result
}


async function validateLogic(sourceInfo, delSource) {
    try{
        const defaultUrl = sourceInfo.defaultUrl
        const source = await createSource(sourceInfo)
        const sourceId = source.sourceId
        let catalog
        if (source != null){
            console.log("created sourceId: ", sourceId)
            const getSourceResult = await getSource(defaultUrl, sourceId)
            // console.log(getSourceResult)
            if (getSourceResult.sourceId == sourceId){
                console.log("getSource succeeded")
                const discoverResult = await discoverSource(defaultUrl, sourceId)
                catalog = discoverResult.catalog
                // console.log(JSON.stringify(catalog, null, 2))
                if (catalog != null){
                    console.log("discoverSource succeeded")
                } else {
                    console.log("discoverSource failed")
                }
                if (delSource == true){
                    const deleteSourceResult = await deleteSource(defaultUrl, sourceId)
                    // console.log(deleteSourceResult)
                    if (deleteSourceResult == true){
                        console.log("deleteSource succeeded")
                    } else {
                        console.log("deleteSource failed")
                    }
                } else {
                    console.log("do not delete source")
                }
            } else {
                console.log("getSource failed")
            }
        } else {
            console.log("createSource failed")
        }       
        if (catalog != null && delSource == true){
            return catalog           
        }else{
            const null_catalog = {
                sourceId: sourceId,
                stremas: null
            }
            return null_catalog
        }
    } catch (error) {
        console.log(error)
    }
}

async function createLogic(sourceInfo) {
    try{
        const defaultUrl = sourceInfo.defaultUrl
        const source = await createSource(sourceInfo)
        const sourceId = source.sourceId
        console.log("created sourceId: ", sourceId)
        // let catalog
        const getSourceResult = await getSource(defaultUrl, sourceId)
        if (getSourceResult.sourceId == sourceId){
            // const discoverResult = await discoverSource(defaultUrl, sourceId)
            // catalog = discoverResult.catalog
            console.log("discverSource succeeded")
            // console.log(JSON.stringify(catalog, null, 2))
        } else { 
            console.log("discoverSource failed")
            return null
        }
        // const results = {
        //     sourceId: sourceId,
        //     syncCatalog: catalog
        // }
        // return results
        return sourceId
    } catch (error) {
        console.log(error)
    }
}

async function removeLogic(sourceInfo, sourceId) {
    try{
        const defaultUrl = sourceInfo.defaultUrl
        if (sourceId != null){
            const getSourceResult = await getSource(defaultUrl, sourceId)
            if (getSourceResult.sourceId == sourceId){
                console.log("removed sourceId: ", sourceId)
                console.log("getSource succeeded")
            }
            const delSourceResult = await deleteSource(defaultUrl, sourceId)
            if (delSourceResult == true){
                console.log("deleteSource succeeded")
                return true
            } else {
                console.log("deleteSource failed")
            }
        } else { 
            console.log("getSource failed")
        }
        return false
    } catch (error) {
        console.log(error)
    }
}