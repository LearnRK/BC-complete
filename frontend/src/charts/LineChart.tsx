import { useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import axios from "axios";
import { BACKEND_URL } from "../config";

const startYearUrl = `${BACKEND_URL}/startYear`;
const endYearUrl = `${BACKEND_URL}/endYear`;

const MARGIN = { top: 30, right: 30, bottom: 50, left: 50 };

export type DataPoint = { x: number; y: number };
type LineChartProps = {
  width: number;
  height: number;
//   data: DataPoint[];
//   data2: DataPoint[];
};

export const LineChart = ({ width, height }: LineChartProps) => {

    const data = getData(startYearUrl)
    const data2 = getData(endYearUrl)

  // bounds = area inside the graph axis = calculated by substracting the margins
  const axesRef = useRef(null);
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  // Y axis
  const max = (d3.max(data, (d) => d.y));
  const yMax = ((max || 0)< 100 ? max: 80)
  const yScale = useMemo(() => {
    return d3
      .scaleLinear()
      .domain([ 0, (yMax || 0)])
      .range([boundsHeight, 0]);
  }, [data, height]);

  // X axis
  const [xMin, xMax] = d3.extent(data, (d) => d.x);
  const xScale = useMemo(() => {
    return d3
      .scaleLinear()
      .domain([(xMin || 0) - 2, xMax || 0])
      .range([0, boundsWidth]);
  }, [data, width]);

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

  // Build the line
  const lineBuilder = d3
    .line<DataPoint>()
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y));
  const linePath = lineBuilder(data);
  const linePath2 = lineBuilder(data2);
  if (!linePath) { return null; }
  if (!linePath2) { return null; }

  return (
    <div>
      <svg width={width} height={height}>
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
        >
          <path
            d={linePath}
            opacity={1}
            stroke="#803cec"
            fill="none"
            strokeWidth={2}
          />
          <path
            d={linePath2}
            opacity={1}
            stroke="#ef4444"
            fill="none"
            strokeWidth={2}
          />
        </g>
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




const getData = (url: string) => {
    const [data, setData ] = useState<DataPoint[]>([]);
    useEffect( () => {
        axios.get<DataPoint[]>(url)
        .then(res => {
        setData(res.data);
        console.log(res.data);
        })
    }, [])
    return data
}



// const temp = () => {
//     const [startYearData, setStartYearData ] = useState<DataPoint[]>([]);
//   const [endYearData, setEndYearData ] = useState<DataPoint[]>([]);

//   useEffect( () => {
//     axios.get<DataPoint[]>(startYearUrl)
//     .then(res => {
//       setStartYearData(res.data);
//       console.log(res.data);
//     })

//     axios.get<DataPoint[]>(endYearUrl)
//     .then(res => {
//       setEndYearData(res.data);
//       console.log(res.data);
//     })

//   }, [])

//   return startYearData
// }