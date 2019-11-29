let offset = 0;
let array = [];
export async function getData(url, query){
	let data = await loadData(url, query)
  const fullArray = data.flat(1);
   let newArray =  d3.nest()
  .key(d => { return d.landLabel.value})
  .entries(fullArray);
   newArray.forEach(item => {
    item.place = item.values[0].landLabel.value;
    item.long = item.values[0].long.value;
    item.lat = item.values[0].lat.value;
     item.material = item.values[0].materialLabel.value;
  })
  console.log(newArray)
  return newArray;
}

async function loadData(url, query){
  for(let i = 0;i <5; i++){
    await runQuery(url, query)
    console.log(array)
  }
  return array;
}

async function runQuery(url, query){
  offset += 10000;
  const queryOffset = `

  PREFIX wgs84: <http://www.w3.org/2003/01/geo/wgs84_pos#>
  PREFIX geo: <http://www.opengis.net/ont/geosparql#>
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  PREFIX gn: <http://www.geonames.org/ontology#>
  PREFIX dct: <http://purl.org/dc/terms/>

  SELECT 	?lat ?long ?landLabel ?materialLabel WHERE {
          ?cho dct:spatial ?place .
          ?place skos:exactMatch/wgs84:lat ?lat .
          ?place skos:exactMatch/wgs84:long ?long .
          ?place skos:exactMatch/gn:parentCountry ?land .
          ?land gn:name ?landLabel .
        ?cho dct:medium ?medium .
       ?medium skos:broader ?medium2 .
			?medium2 skos:broader ?medium3 .
  		?medium3 skos:broader ?medium4 .
  		?medium4 skos:broader ?mediumBroad .
  		?mediumBroad skos:prefLabel ?materialLabel .

    } LIMIT 10000 OFFSET ${offset}
  `
   await d3.json(url +"?query="+ encodeURIComponent(queryOffset) + "&format=json")
    .then(data => data.results.bindings)
  	.then(json => {
    array.push(json)
  })
}
