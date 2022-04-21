const axios = require('axios').default

// shared api
module.exports = { getCatalog, getNextCatalog, getDataset }

function getCatalog(sourceInfo) {
  
    const url = sourceInfo.defaultUrl + "catalog.rdf"

    const result = axios.post(url)
        .then(function (response) {
            const data = response.data
            return data

        }).catch(function (error) {
            console.log(error)
        })
    return result
}

function getDataset(sourceInfo) {

    const url = sourceInfo.defaultUrl + ".rdf"
   
    const result = axios.post(url)
        .then(function (response) {
            const data = response.data
            return data

        }).catch(function (error) {
            console.log(error)
        })
    return result
}

function getNextCatalog(sourceInfo, page) {

    const url = sourceInfo.defaultUrl + "catalog.rdf?page=" + page

    const result = axios.post(url)
        .then(function (response) {
            const data = response.data
            return data

        }).catch(function (error) {
            console.log(error)
        })
    return result
}
