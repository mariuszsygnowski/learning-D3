import React, {useState, useEffect, useRef} from 'react';
import * as d3 from 'd3';

const Chart = () => {
  const [widthWindow, setWidthWindow] = useState(window.innerWidth);
  const [heightWindow, setHeightWindow] = useState(window.innerHeight);
  const [data, setData] = useState(['banana', 'apple', 'kiwi']);

  useEffect(() => {
    const handleResize = () => {
      setWidthWindow(window.innerWidth);
      setHeightWindow(window.innerHeight);
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
      const allCircles = svg.selectAll('circle').data(data);

      allCircles
        .enter()
        .append('circle')
        .merge(allCircles)
        .attr('cx', (d, i) => i * circleWidth + rLength)
        .attr('cy', innerHeight / 2)
        .attr('r', rLength - 10)
        .attr('fill', 'green');

      allCircles.exit().remove();
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
