import { select } from 'd3';

export function filterCategory(data, category) {
  const svg = select('.datavisualisation');
  let filteredArray = [];
  data.forEach(country => {
    country.values.filter(item => {
      if (item.materialLabel.value == `${category}`) {
        filteredArray.push(item);
      }
    });
  });
  let nestedArray = d3
    .nest()
    .key(d => {
      return d.landLabel.value;
    })
    .entries(filteredArray);
  nestedArray.forEach(item => {
    item.place = item.values[0].landLabel.value;
    item.long = item.values[0].long.value;
    item.lat = item.values[0].lat.value;
    item.material = item.values[0].materialLabel.value;
  });
  return nestedArray;
}

export function filterGetCategory(data) {
  const svg = select('.datavisualisation');
  let filteredArray = [];
  data.forEach(country => {
    country.values.forEach(item => {
    		filteredArray.push(item.materialLabel.value) 
    })
    });
  let nestedArray = d3
    .nest()
    .key(d => {
      return d;
    })
    .entries(filteredArray);
  return nestedArray;
}