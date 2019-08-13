import React, {useState, useEffect, useRef} from 'react';
import * as d3 from 'd3';

const Chart = () => {
  useEffect(() => {
    const svg = d3.select('#svgChart');

    svg
      .append('text')
      .text('test D3')
      .attr('y', 20);
  }, []);

  return (
    <div className='Chart'>
      <svg id='svgChart' />
    </div>
  );
};

export default Chart;
