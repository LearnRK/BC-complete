import { useEffect, useMemo,  useState } from "react";
import * as d3 from "d3";
import axios from "axios";

type DataItem = {
  name: string;
  value: number;
};
type PieChartProps = {
  width: number;
  height: number;
//   data: DataItem[];
};

const MARGIN_X = 150;
const MARGIN_Y = 50;
const INFLEXION_PADDING = 20; // space between donut and label inflexion point

const colors = [
  "#ffcc33",
  "#66ff66",
  "#16d0cb",
  "#fd5b78",
  "#ffff66",
  "#50bfe6",
  "#ff6037",
  "#ccff00",
  "#9c27b0",
  "#ff9966",
  "#ff355e",
  "#ee34d2",
  "#ff9933",
  "#aaf0d1",
  "#ff00cc",
  "#9a6fb0",
  "#a53253",
  "#69b3a2",
];

const regionDataUrl = "https://57845aef-505b-40a3-9179-1e48526405db-00-dp6axrnklxf9.sisko.replit.dev/api/v1/region";


export const PieChart = ({ width, height }: PieChartProps) => {

    const data = getData(regionDataUrl);

  const radius = Math.min(width - 2 * MARGIN_X, height - 2 * MARGIN_Y) / 2;

  const pie = useMemo(() => {
    const pieGenerator = d3.pie<any, DataItem>().value((d) => d.value);
    return pieGenerator(data);
  }, [data]);

  const arcGenerator = d3.arc();

  const shapes = pie.map((grp, i) => {
    // First arc is for the pie
    const sliceInfo = {
      innerRadius: 0,
      outerRadius: radius,
      startAngle: grp.startAngle,
      endAngle: grp.endAngle,
    };
    const centroid = arcGenerator.centroid(sliceInfo);
    const slicePath = arcGenerator(sliceInfo);

    // Second arc is for the legend inflexion point
    const inflexionInfo = {
      innerRadius: radius + INFLEXION_PADDING,
      outerRadius: radius + INFLEXION_PADDING,
      startAngle: grp.startAngle -0.5,
      endAngle: grp.endAngle -0.5,
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
          fontSize={16}
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


