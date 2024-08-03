import { useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import axios from "axios";

const MARGIN = { top: 30, right: 30, bottom: 30, left: 30 };

type ViolinProps = {
  width: number;
  height: number;
//   data: { name: string; value: number }[];
};

const relevanceDataUrl = "https://57845aef-505b-40a3-9179-1e48526405db-00-dp6axrnklxf9.sisko.replit.dev/api/v1/relevance";


export const ViolinPlot = ({ width, height }: ViolinProps) => {

  const data = getData(relevanceDataUrl); 

  // Layout. The div size is set by the given props.
  // The bounds (=area inside the axis) is calculated by substracting the margins
  const axesRef = useRef(null);
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  // Compute everything derived from the dataset:
  const { min, max, groups } = useMemo(() => {
    const [min, max] = d3.extent(data.map((d) => d.value)) as [number, number];
    const groups = data
      .map((d) => d.name)
      .filter((x, i, a) => a.indexOf(x) == i);
    return { min, max, groups };
  }, [data]);

  // Compute scales
  const yScale = d3
    .scaleLinear()
    .domain([min, max])
    .range([boundsHeight, 0])
    .nice();

  const xScale = d3
    .scaleBand()
    .range([0, boundsWidth])
    .domain(groups)
    .padding(0.25);

  // Render the X and Y axis using d3.js, not react
  useEffect(() => {
    const svgElement = d3.select(axesRef.current);
    svgElement.selectAll("*").remove();
    const xAxisGenerator = d3.axisBottom(xScale);
    svgElement
      .append("g")
      .attr("transform", "translate(0," + boundsHeight + ")")
      .call(xAxisGenerator);

    const yAxisGenerator = d3.axisLeft(yScale);
    svgElement.append("g").call(yAxisGenerator);
  }, [xScale, yScale, boundsHeight]);

  // Build the shapes
  const allShapes = groups.map((group, i) => {
    const groupData = data.sort((a, b) => parseInt(a.name) - parseInt(b.name)).filter((d) => d.name === group).map((d) => d.value);
    return (
      <g key={i} transform={`translate(${xScale(group)},0)`}>
        <VerticalViolinShape
          data={groupData}
          yScale={yScale}
          width={xScale.bandwidth()}
          binNumber={10}
        />
      </g>
    );
  });

  return (
    <div>
      <svg width={width} height={height} style={{ display: "inline-block" }}>
        {/* first group is for the violin and box shapes */}
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
        >
          {allShapes}
        </g>
        {/* Second is for the axes */}
        <g
          width={boundsWidth}
          height={boundsHeight}
          ref={axesRef}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
        />
      </svg>
    </div>
  );
};




type VerticalViolinShapeProps = {
  data: number[];
  binNumber: number;
  yScale: d3.ScaleLinear<number, number, never>;
  width: number;
};

const VerticalViolinShape = ({
  data,
  yScale,
  width,
  binNumber,
}: VerticalViolinShapeProps) => {
  const min = Math.min(...data);
  const max = Math.max(...data);

  const binBuilder = d3
    .bin()
    .domain([min, max])
    .thresholds(yScale.ticks(binNumber))
    .value((d) => d);
  const bins = binBuilder(data);

  const biggestBin = Math.max(...bins.map((b) => b.length));

  const wScale = d3
    .scaleLinear()
    .domain([-biggestBin, biggestBin])
    .range([0, width]);

  const areaBuilder = d3
    .area<d3.Bin<number, number>>()
    .x0((d) => wScale(-d.length))
    .x1((d) => wScale(d.length))
    .y((d) => yScale(d.x0 || 0))
    .curve(d3.curveBumpY);

  const areaPath = areaBuilder(bins);

  return (
    <path
      d={areaPath || undefined}
      opacity={1}
      stroke="black"
      fill="#cb1dd1"
      fillOpacity={0.6}
      strokeWidth={1}
    />
  );
};



type Data = { name: string; value: number }[];;
// fetch data module
const getData = (url: string) => {
    const [data, setData ] = useState<Data>([]);
    useEffect( () => {
        axios.get<Data>(url)
        .then(res => {
        setData(res.data);
        console.log(res.data);
        })
    }, [])
    return data
}


