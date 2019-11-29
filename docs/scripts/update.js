import { select } from 'd3';
import { clicked, hover } from './animations';
import { addLegend } from './legend';

export function update(data, projection) {
   const svg = select('.datavisualisation');
  const minValue = d3.min(data, function(d) {
    return d.values.length;
  });
  const maxValue = d3.max(data, function(d) {
    return d.values.length;
  });
  const size = d3
    .scaleSqrt()
    .domain([0, maxValue])
    .range([0, 25]);
  console.log(data)
 
  const color = d3
    .scaleLinear()
    .domain([0, maxValue])
    .range(['#5BECFE', '#0481ff', '#005ab4']);
  const circle = svg.selectAll('circle');
  circle
    .transition()
    .duration(500)
    .attr('r', 0);

  circle
    .data(data)
    .exit()
    // .remove();
  
  setTimeout( () => {
  circle
    .attr('cx', d => projection([d.long, d.lat])[0])
    .attr('cy', d => projection([d.long, d.lat])[1]);

  circle
    .data(data)
    .transition()
    .duration(500)
    .attr('r', d => size(d.values.length))
    .style('fill', d => color(d.values.length));
    }, 500);
  
	hover(circle, data, size)
 	addLegend(data, size, maxValue, minValue);
}
