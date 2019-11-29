import { select, geoMercator, drag, event, selectAll } from 'd3';
import { feature } from 'topojson';
import { getData } from './getData';
import { getMap } from './getMap';
import { clicked, hover } from './animations';
import { filterCategory, filterGetCategory } from './filter';
import { update } from './update';
import { addLegend } from './legend';

const url =
  'https://api.data.netwerkdigitaalerfgoed.nl/datasets/ivo/NMVW/services/NMVW-30/sparql';
const query = `
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
  		
  } LIMIT 10000
`;

const svg = select('.datavisualisation');
const g = svg.append('g');
const width = screen.width;
const height = screen.height;
const projection = geoMercator().scale([110]);
const zoom = d3.zoom().scaleExtent([1, 16]);

makeSVG();

async function makeSVG() {
  svg.attr('width', width).attr('height', height);
  getMap(svg, projection);
  let data = await getData(url, query);
  plotLatLong(data);
  changeInput(data);
  zoomSVG();
}

function plotLatLong(data) {
  console.log(data);
  const maxValue = d3.max(data, function(d) {
    return d.values.length;
  });
  const minValue = d3.min(data, function(d) {
    return d.values.length;
  });
  const color = d3
    .scaleLinear()
    .domain([0, maxValue])
    .range(['#5BECFE', '#0481ff', '#005ab4']);
  const size = d3
    .scaleSqrt()
    .domain([0, maxValue])
    .range([1, 25]);
  svg
    .selectAll('.sphere')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', d => projection([d.long, d.lat])[0])
    .attr('cy', d => projection([d.long, d.lat])[1])
    .attr('r', d => size(d.values.length))
    .style('fill', d => color(d.values.length));

  hover(svg.selectAll('circle'), data, size);
  addLegend(data, size, maxValue, minValue);
}

function changeInput(data) {
  let categories = filterGetCategory(data);
  console.log(categories);
  let dropdown = select('.input-container')
    .append('select')
    .attr('id', 'categoryList');
  let options = dropdown
    .selectAll('option')
    .data(categories)
    .enter()
    .append('option');
  options
    .text(d => d.key)
    .attr('value', d => d.key)
  	.attr('id', d => d.key)
  // 	.on('click', function() {
  //   category = 'all';
  //   update(data, projection);
  // });
  
  select('#categoryList')
  .on('change', function() {
    console.log(this.value)
    let category = this.value;
    let houtArray = filterCategory(data, category);
    update(houtArray, projection);
  });
}

function zoomSVG() {
  svg.call(
    zoom.on('zoom', () => {
      svg.selectAll('g').attr('transform', d3.event.transform);
      svg.selectAll('circle').attr('transform', d3.event.transform);
    })
  );
}
