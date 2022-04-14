const { XMLParser, XMLBuilder, XMLValidator } = require('fast-xml-parser')

module.exports = {catalogParser, distributionParser, datasetParser, schemaParser}


function catalogParser(data){
    const options = {
        ignoreAttributes: false,
        attributeNamePrefix : "@_"
    }
    const catalogParser = new XMLParser(options);
    const catalog = catalogParser.parse(data);

    return catalog
}

function distributionParser(catalog, format){
    
    const data = catalog
    //console.log(data)
    const dist = data['rdf:RDF']['dcat:Distribution']
    
    //console.log(dist)
    const count = Object.keys(dist).length;
    console.log(`Number of Distribution in Catalog: ${count}`)
    let i = 0
    let j = 0
    let url_list = []
    while(i < count){
        if(dist[i]['dct:format'] == format){
            //console.log(dist[i])
            if(j%10 == 0) console.log(dist[i])
            url_list[j] = dist[i]['dcat:accessURL']['@_rdf:resource']
            j++
        }
        i++
    }
    //console.log(`URL list: ${url_list}`)
    console.log(url_list.length)

    return url_list
}

function datasetParser(catalog){
    
    //console.log(data)
    const dataset = catalog['rdf:RDF']['dcat:Catalog']['dcat:dataset']
    // const dataset = catalog['rdf:RDF']['dcat:Catalog']['dcat:dataset']['dcat:Dataset']['dcat:distribution']
    //console.log(dist)
    const count = dataset.length;
    console.log(`Number of Datasets in Catalog: ${count}`)

    return dataset
}

function schemaParser(catalog){
    const schema = catalog['rdf:RDF']['hydra:PagedCollection']

    const fp = schema['hydra:firstPage']
    const lp = schema['hydra:lastPage']
    const np = schema['hydra:nextPage']
    const ti = schema['hydra:totalItems']['#text']

    const results = {
        firstPage: fp,
        lastPage: lp,
        nextPage: np,
        totalItem: ti
    }

    return results
}