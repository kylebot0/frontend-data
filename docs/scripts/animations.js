import { select } from 'd3';
const tooltip = d3
  .select('#root')
  .append('div')
  .attr('class', 'tooltip')
  .style('opacity', 0);

export function hover(circle, d, size){
 circle.on('mouseover', function(d) {
      d3.select(this)
        .transition()
        .duration(350)
        .attr('opacity', '0.6')
        .attr('r', d => size(d.values.length * 1.3))
        .attr('stroke', '#fff')
        .attr('stroke-width', '0.5px');

      tooltip
        .transition()
        .duration(200)
        .style('opacity', '0.8');

      tooltip
        .html('<h2>' + d.key + '</h2><p>' + d.values.length + ' objecten </p>')
        .style('left', d3.event.pageX + 15 + 'px')
        .style('top', d3.event.pageY - 30 + 'px');
    circle})
    .on('mouseout', function() {
      d3.select(this)
        .transition()
        .duration(350)
        .attr('opacity', '1')
        .attr('r', d => size(d.values.length))
        .attr('stroke', '0')
        .attr('stroke-width', '0');

      tooltip
        .transition()
        .duration(500)
        .style('opacity', 0);
    })
    circle.on('click', clicked);
}
export function clicked() {
  openModal();
  closeModal();
}

function openModal() {
  select('.modal')
    .transition()
    .style('left', '0')
    .style('display', 'block')
    .style('background-color', 'rgba(0,0,0,0.3)');
}

function closeModal() {
  select('.close').on('click', () => {
    select('.modal')
      .style('left', '-40%')
      .style('display', 'none')
      .style('background-color', 'rgba(0,0,0,0)');
  });
}

