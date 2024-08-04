import { useEffect, useMemo, useState } from "react";
import { ScaleLinear } from "d3";
import * as d3 from 'd3';
import axios from "axios";
import { BACKEND_URL } from "../config";

const scatterPlotUrl = `${BACKEND_URL}/intensity`;

const MARGIN = { top: 60, right: 60, bottom: 60, left: 60 };

type ScatterplotProps = {
  width: number;
  height: number;
};

export const Scatterplot = ({ width, height }: ScatterplotProps) => {

    const data = getData(scatterPlotUrl);

  // Layout. The div size is set by the given props.
  // The bounds (=area inside the axis) is calculated by substracting the margins
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  // Scales
  const yScale = d3.scaleLinear().domain([0, 75]).range([boundsHeight, 0]);
  const xScale = d3.scaleLinear().domain([2015, 2030]).range([0, boundsWidth]);

  // Build the shapes
  const allShapes = data.map((d, i) => {
    return (
      <circle
        key={i}
        r={8}
        cx={xScale(d.x)}
        cy={yScale(d.y<75?d.y:75)}
        opacity={1}
        stroke="#cb1dd1"
        fill="#cb1dd1"
        fillOpacity={0.2}
        strokeOpacity={0.2}
        strokeWidth={1}
      />
    );
  });

  return (
    <div>
      <svg width={width} height={height}>
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(',')})`}
        >
          {/* Y axis */}
          <AxisLeft yScale={yScale} pixelsPerTick={40} width={boundsWidth} />

          {/* X axis, use an additional translation to appear at the bottom */}
          <g transform={`translate(0, ${boundsHeight})`}>
            <AxisBottom
              xScale={xScale}
              pixelsPerTick={40}
              height={boundsHeight}
            />
          </g>

          {/* Circles */}
          {allShapes}
        </g>
      </svg>
    </div>
  );
};




type AxisBottomProps = {
  xScale: ScaleLinear<number, number>;
  pixelsPerTick: number;
  height: number;
};

// tick length
const TICK_LENGTH = 10;

const AxisBottom = ({
  xScale,
  pixelsPerTick,
  height,
}: AxisBottomProps) => {
  const range = xScale.range();

  const ticks = useMemo(() => {
    const width = range[1] - range[0];
    const numberOfTicksTarget = Math.floor(width / pixelsPerTick);

    return xScale.ticks(numberOfTicksTarget).map((value) => ({
      value,
      xOffset: xScale(value),
    }));
  }, [xScale]);

  return (
    <>
      {/* Ticks and labels */}
      {ticks.map(({ value, xOffset }) => (
        <g
          key={value}
          transform={`translate(${xOffset}, 0)`}
          shapeRendering={"crispEdges"}
        >
          <line
            y1={TICK_LENGTH}
            y2={-height - TICK_LENGTH}
            stroke="#222222"
            strokeWidth={0.5}
          />
          <text
            key={value}
            style={{
              fontSize: "16px",
              textAnchor: "middle",
              transform: "translateY(20px)",
              fill: "#222222",
            }}
          >
            {value}
          </text>
        </g>
      ))}
    </>
  );
};


type AxisLeftProps = {
    yScale: ScaleLinear<number, number>;
    pixelsPerTick: number;
    width: number;
};
  
//   const TICK_LENGTH = 10;
  
  export const AxisLeft = ({ yScale, pixelsPerTick, width }: AxisLeftProps) => {
    const range = yScale.range();
  
    const ticks = useMemo(() => {
      const height = range[0] - range[1];
      const numberOfTicksTarget = Math.floor(height / pixelsPerTick);
  
      return yScale.ticks(numberOfTicksTarget).map((value) => ({
        value,
        yOffset: yScale(value),
      }));
    }, [yScale]);
  
    return (
      <>
        {/* Ticks and labels */}
        {ticks.map(({ value, yOffset }) => (
          <g
            key={value}
            transform={`translate(0, ${yOffset})`}
            shapeRendering={"crispEdges"}
          >
            <line
              x1={-TICK_LENGTH}
              x2={width + TICK_LENGTH}
              stroke="#222222"
              strokeWidth={0.5}
            />
            <text
              key={value}
              style={{
                fontSize: "16px",
                textAnchor: "middle",
                transform: "translateX(-20px)",
                fill: "#222222",
              }}
            >
              {value}
            </text>
          </g>
        ))}
      </>
    );
};


type Data = { x: number; y: number }[];

// Data fetch module
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