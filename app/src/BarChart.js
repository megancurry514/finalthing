import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

const BarChart = ({ data, width, height }) => {
  const svgRef = useRef();
  const [hoveredBar, setHoveredBar] = useState(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // Clear previous chart
    svg.selectAll("*").remove();

    // Create scales
    const xScale = d3
      .scaleBand()
      .domain(data.map((d, i) => i))
      .range([0, width])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .nice()
      .range([height, 0]);

    // Draw bars
    svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => xScale(i))
      .attr("y", d => yScale(d.value))
      .attr("width", xScale.bandwidth())
      .attr("height", d => height - yScale(d.value))
      .attr("fill", (d, i) => (i === hoveredBar ? "red" : "steelblue"))
      .on("mouseover", (_, i) => setHoveredBar(i))
      .on("mouseout", () => setHoveredBar(null));

    // Draw axes
    const xAxis = d3.axisBottom(xScale);
    svg.append("g").attr("transform", `translate(0, ${height})`).call(xAxis);

    const yAxis = d3.axisLeft(yScale);
    svg.append("g").call(yAxis);
  }, [data, hoveredBar, height, width]);

  return <svg ref={svgRef} width={width} height={height} />;
};

export default BarChart;
