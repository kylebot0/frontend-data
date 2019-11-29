import { select } from 'd3';

export function addLegend(data, size, maxValue, minValue) {
  const legend = select('.legend');
  let meanValue = Math.floor((maxValue + minValue) / 3);
  
  legend.attr('width', '150').attr('height', '100');
  
  legend.selectAll('g').remove();
  
  legend
    .append('g')
    .selectAll('g')
    .data([minValue, meanValue, maxValue])
    .enter()
    .append('circle')
    .attr('cx', '75')
    .attr('cy', d => 55 - size(d))
    .attr('r', d => size(d));

  legend
  	.append('g')
    .selectAll('g')
    .data([minValue, meanValue, maxValue])
    .enter()
    .append('line')
    .attr('x1', d => 75 + size(d))
    .attr('x2', '120')
    .attr('y1', d => 55 - size(d))
    .attr('y2', d => 55 - size(d))
    .attr('stroke', 'white')
    .style('stroke-dasharray', '2,2');

  legend
 		.append('g')
    .selectAll('g')
    .data([minValue, meanValue, maxValue])
    .enter()
    .append('text')
    .text(d => d)
    .attr('x', '135')
    .attr('y', d => 45 - size(d))
    .attr('dy', '1.3em')
    .attr('alignment-baseline', 'middle')
    .style('font-size', '0.6em');
}
