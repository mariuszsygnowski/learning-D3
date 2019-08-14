import React, {useState, useEffect, useRef} from 'react';
import * as d3 from 'd3';

const Chart = () => {
  const setInnerHeight = () => {
    if (d3.select('#svgChart')._groups[0][0] === null) return 100;
    const svg = d3.select('#svgChart');
    const rLength = svg.selectAll('circle').attr('r');

    return window.innerHeight > rLength * 6 ? window.innerHeight : rLength * 6;
  };
  const [widthWindow, setWidthWindow] = useState(window.innerWidth);
  const [heightWindow, setHeightWindow] = useState(setInnerHeight());
  const [data, setData] = useState([
    {fruit: 'kiwi', color: 'green'},
    {fruit: 'apple', color: 'red'},
    {fruit: 'mango', color: 'lightyellow'},
    {fruit: 'veryLongVeryLongVeryLongWord', color: 'brown'},
    {fruit: 'banana', color: 'yellow'}
  ]);

  useEffect(() => {
    const handleResize = () => {
      setWidthWindow(window.innerWidth);
      setHeightWindow(setInnerHeight());
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  useEffect(() => {
    const margin = {top: 20, right: 30, bottom: 20, left: 20};
    const innerWidth = widthWindow - margin.left - margin.right;
    const innerHeight = heightWindow - margin.top - margin.bottom;

    const svg = d3
      .select('#svgChart')
      .attr('width', innerWidth)
      .attr('height', innerHeight);

    const createChart = () => {
      const circleWidth = innerWidth / data.length;
      const rLength = circleWidth / 2;
      const distanceBetweenCircles = 10;

      function textSize(text) {
        if (!d3) return;
        var container = d3.select('body').append('svg');
        container
          .append('text')
          .attr('x', -99999)
          .attr('y', -99999)
          .text(text);
        var size = container.node().getBBox();
        container.remove();
        return {width: size.width, height: size.height};
      }

      const allCircles = svg.selectAll('circle').data(data);

      allCircles
        .enter()
        .append('circle')
        .merge(allCircles)
        .attr('cx', (d, i) => i * circleWidth + rLength)
        .attr('cy', innerHeight / 2)
        .attr('r', rLength - distanceBetweenCircles)
        .attr('fill', d => d.color)
        .attr('stroke', 'black');
      allCircles.exit().remove();

      const allG = svg.selectAll('text').data(data);

      allG
        .enter()
        .append('text')
        .merge(allG)
        .attr('transform', (d, i) => {
          const textWidth = textSize(d.fruit).width;
          const halfLengthOfTextWidth = textWidth / 2;
          return `translate(${i * circleWidth + circleWidth / 2 - halfLengthOfTextWidth}, ${innerHeight / 2 -
            rLength})`;
        })
        .text(d => d.fruit);

      allG.exit().remove();

      setHeightWindow(setInnerHeight());
    };
    createChart();
  }, [widthWindow, heightWindow, data]);

  return (
    <div className='Chart'>
      <svg id='svgChart' />
    </div>
  );
};

export default Chart;
