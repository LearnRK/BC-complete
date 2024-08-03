import * as d3 from "d3";
import { hexbin } from "d3-hexbin";

import { useEffect, useMemo, useState } from "react";
import { ScaleLinear } from "d3";
import axios from "axios";

const MARGIN = { top: 60, right: 60, bottom: 60, left: 60 };
const BIN_SIZE = 25;

type HexbinProps = {
  width: number;
  height: number;
//   data: { x: number; y: number }[];
};

const likelihoodDataUrl = "https://57845aef-505b-40a3-9179-1e48526405db-00-dp6axrnklxf9.sisko.replit.dev/api/v1/likelihood";

export const Hexbin = ({ width, height }: HexbinProps) => {

  const data = getData(likelihoodDataUrl);
  // Layout. The div size is set by the given props.
  // The bounds (=area inside the axis) is calculated by substracting the margins
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  // Scales
  const yScale = d3.scaleLinear().domain([0, 5.5]).range([boundsHeight, 0]);
  const xScale = d3.scaleLinear().domain([2008, 2055]).range([0, boundsWidth]);

  const hexbinGenerator = hexbin()
    .radius(BIN_SIZE)
    .extent([
      [0, 0],
      [boundsWidth, boundsHeight],
    ]);

  const hexbinData = hexbinGenerator(
    data.map((item) => [xScale(item.x), yScale(item.y)])
  );

  const maxItemPerBin = Math.max(...hexbinData.map((hex) => hex.length));

  const colorScale = d3
    .scaleSqrt<string>()
    .domain([0, maxItemPerBin])
    .range(["#ffb3c0", "#a4133c"]);

  const opacityScale = d3
    .scaleLinear<number>()
    .domain([0, maxItemPerBin])
    .range([0.2, 1]);

  // Build the shapes
  const allShapes = hexbinData.map((d, i) => {
    return (
      <path
        key={i}
        d={hexbinGenerator.hexagon()}
        transform={"translate(" + d.x + "," + d.y + ")"}
        opacity={1}
        stroke={"white"}
        fill={colorScale(d.length)}
        // fillOpacity={opacityScale(d.length)}
        strokeOpacity={opacityScale(d.length)}
        strokeWidth={0.5}
      />
    );
  });

  return (
    <div>
      <svg width={width} height={height}>
        {/* first group is for the violin and box shapes */}
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
        >
          {/* Y axis */}
          <AxisLeft yScale={yScale} pixelsPerTick={100} width={boundsWidth} />

          {/* X axis, use an additional translation to appear at the bottom */}
          <g transform={`translate(0, ${boundsHeight})`}>
            <AxisBottom
              xScale={xScale}
              pixelsPerTick={100}
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

export const AxisBottom = ({
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
            stroke="#ffb3c0"
            strokeWidth={0.5}
          />
          <text
            key={value}
            style={{
              fontSize: "20px",
              textAnchor: "middle",
              transform: "translateY(20px)",
              fill: "#a4133c",
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

// const TICK_LENGTH = 10;

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
            stroke="#ffb3c0"
            strokeWidth={0.5}
          />
          <text
            key={value}
            style={{
              fontSize: "20px",
              textAnchor: "middle",
              transform: "translateX(-20px)",
              fill: "#a4133c",
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


