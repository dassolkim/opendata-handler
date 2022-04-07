const UKdefaultUrl = "https://data.gov.uk/"
const USdefaultUrl = "https://catalog.data.gov/"
const CAdefaultUrl = "https://open.canada.ca/data/en/"
const CHdefaultUrl = "https://opendata.swiss/en/"

const formatList = ['CSV', 'GeoJSON', 'KML', 'JSON', 'HTML', 'XLSX']
const fileFormat = ['csv', 'json', 'jsonl', 'xlsx', 'parquet', 'feather']

exports.UKdefaultUrl = UKdefaultUrl
exports.USdefaultUrl = USdefaultUrl
exports.CAdefaultUrl = CAdefaultUrl
exports.CHdefaultUrl = CHdefaultUrl

/**
 * ISO_3166_country_codes
 * 
 * America: US
 * Canada: CA
 * Swiss: CH
 * Singapore: SG
 * Korea: KR
 * exception: UK
 */