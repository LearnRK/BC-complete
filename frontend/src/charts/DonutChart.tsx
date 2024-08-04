import { useEffect, useMemo, useState } from "react";
import * as d3 from "d3";
import axios from "axios";
import { BACKEND_URL } from "../config";

type DataItem = {
  name: string;
  value: number;
};
type DonutChartProps = {
  width: number;
  height: number;
//   data: DataItem[];
};

const MARGIN_X = 150;
const MARGIN_Y = 50;
const INFLEXION_PADDING = 20; // space between donut and label inflexion point

const colors = [
    "#524b18",
    "#7a6f23",
    "#a2942e",
    "#c7b63c",
    "#d2c564",
    "#ded48b",
    "#e9e2b3",
];

const sectorDataUrl = `${BACKEND_URL}/sector`;

export const DonutChart = ({ width, height }: DonutChartProps) => {

  const data = getData(sectorDataUrl);
  const radius = Math.min(width - 2 * MARGIN_X, height - 2 * MARGIN_Y) / 2;
  const innerRadius = radius / 2;

  const pie = useMemo(() => {
    const pieGenerator = d3.pie<any, DataItem>().value((d) => d.value);
    return pieGenerator(data);
  }, [data]);

  const arcGenerator = d3.arc();

  const shapes = pie.map((grp, i) => {
    // First arc is for the donut
    const sliceInfo = {
      innerRadius,
      outerRadius: radius,
      startAngle: grp.startAngle +0.8,
      endAngle: grp.endAngle +0.8,
    };
    const centroid = arcGenerator.centroid(sliceInfo);
    const slicePath = arcGenerator(sliceInfo);

    // Second arc is for the legend inflexion point
    const inflexionInfo = {
      innerRadius: radius + INFLEXION_PADDING,
      outerRadius: radius + INFLEXION_PADDING,
      startAngle: grp.startAngle +1,
      endAngle: grp.endAngle +1,
    };
    const inflexionPoint = arcGenerator.centroid(inflexionInfo);

    const isRightLabel = inflexionPoint[0] > 0;
    const labelPosX = inflexionPoint[0] + 50 * (isRightLabel ? 1 : -1);
    const textAnchor = isRightLabel ? "start" : "end";
    const label = grp.data.name + " (" + grp.value + ")";

    return (
      <g key={i}>
        <path d={slicePath || undefined} fill={colors[i]} />
        <circle cx={centroid[0]} cy={centroid[1]} r={2} />
        <line
          x1={centroid[0]}
          y1={centroid[1]}
          x2={inflexionPoint[0]}
          y2={inflexionPoint[1]}
          stroke={"black"}
          fill={"black"}
        />
        <line
          x1={inflexionPoint[0]}
          y1={inflexionPoint[1]}
          x2={labelPosX}
          y2={inflexionPoint[1]}
          stroke={"black"}
          fill={"black"}
        />
        <text
          x={labelPosX + (isRightLabel ? 2 : -2)}
          y={inflexionPoint[1]}
          textAnchor={textAnchor}
          dominantBaseline="middle"
          fontSize={14}
        >
          {label}
        </text>
      </g>
    );
  });

  return (
    <svg width={width} height={height} style={{ display: "inline-block" }}>
      <g transform={`translate(${width / 2}, ${height / 2})`}>{shapes}</g>
    </svg>
  );
};



type Data = DataItem[];
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


