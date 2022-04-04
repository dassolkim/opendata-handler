/**
 * default config information
 */

// HPC01 config
// const workspaceId = "ff385b87-9469-47cb-9733-4eb23d771987"
// const defaultUrl = "http://114.70.235.40:18000/api/v1/"

// HPC02 config
const workspaceId = "04cac826-ec80-4cd9-89be-d5811d8e910b"
const destinationDefinitionId = "25c5221d-dce2-4163-ade9-739ef790f503"
const defaultUrl = "http://114.70.235.40:28000/api/v1/"
const sourceDefinitionId = "decd338e-5647-4c0b-adf4-da0e75f5a750"
const csvSourceDefinitnionId = "778daa7c-feaf-4db6-96f3-70fd645acc77"
const operationId = "c4e8a344-1c94-4c3f-8e3a-5e4ce9fec6e5"
const status = "active"

const jsonConnectSource = {
    "url": "http://geoserver.nottinghamcity.gov.uk/opendata/geojson/ncc_Recycling_Centres.json",
    "format": "json",
    "provider": {
        "storage": "HTTPS"
    },
    "dataset_name": "json_table_1"
}
// csv(airbyte tested) source: "https://storage.googleapis.com/covid19-open-data/v2/latest/epidemiology.csv"
// csv(us_portal, no-header) source: "https://podaac-tools.jpl.nasa.gov/drive/files/allData/rapidscat/ancillary/revtime.csv"
const csvConnectSource = {
    "url": "https://data.cityofnewyork.us/api/views/wutj-3rsj/rows.csv?accessType=DOWNLOAD",
    "format": "csv",
    "provider": {
        "storage": "HTTPS"
    },
    "dataset_name": "us_portal_csv_test"
}
const connectSource = {
    "host": "114.70.235.40",
    // "port": 15432,
    "port": 25432,
    "database": "api_source",
    "password": "dke!!214!!",
    "username": "knu"
}
const connectDestination = {
    "host": "114.70.235.40",
    // "port": 15432,
    "port": 25432,
    "database": "create_destination",
    "password": "dke!!214!!",
    "username": "knu",
    "schema": "public"
}

exports.workspaceId = workspaceId
exports.defaultUrl = defaultUrl
exports.destinationDefinitionId = destinationDefinitionId
exports.sourceDefinitionId = sourceDefinitionId
exports.csvSourceDefinitnionId = csvSourceDefinitnionId
exports.csvConnectSource = csvConnectSource
exports.jsonConnectSource = jsonConnectSource
exports.operationId = operationId
exports.status = status
exports.connectSource = connectSource
exports.connectDestination = connectDestination