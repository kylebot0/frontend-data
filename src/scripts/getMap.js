import { geoPath } from 'd3';

export function getMap(svg, projection) {
  const pathGenerator = geoPath().projection(projection);
  setup(svg, pathGenerator);
  d3.json('https://enjalot.github.io/wwsd/data/world/world-110m.geojson').then(data => {
    svg
    	.append('g')
      .selectAll('path')
      .data(data.features)
      .enter()
      .append('path')
      .attr('class', 'country')
      .attr('d', pathGenerator);
  });
}

function setup(svg, pathGenerator) {
  svg
    .append('path')
    .attr('class', 'sphere')
    .attr('d', pathGenerator({ type: 'Sphere' }));
}


