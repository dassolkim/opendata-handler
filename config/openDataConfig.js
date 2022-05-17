const UKdefaultUrl = "https://data.gov.uk/"
const USdefaultUrl = "https://catalog.data.gov/"
const CAdefaultUrl = "https://open.canada.ca/data/en/"
const CHdefaultUrl = "https://opendata.swiss/en/"
const OKdefaultUrl = "https://data.ok.gov/"
const NYdefaultUrl = "https://nycopendata.socrata.com/"

const formatList = ['CSV', 'GeoJSON', 'KML', 'JSON', 'HTML', 'XLSX']
const fileFormat = ['csv', 'json', 'jsonl', 'xlsx', 'parquet', 'feather']

exports.UKdefaultUrl = UKdefaultUrl
exports.USdefaultUrl = USdefaultUrl
exports.CAdefaultUrl = CAdefaultUrl
exports.CHdefaultUrl = CHdefaultUrl
exports.OKdefaultUrl = OKdefaultUrl
exports.NYdefaultUrl = NYdefaultUrl

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