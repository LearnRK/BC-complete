import { useEffect, useMemo, useState } from "react";
import * as d3 from "d3";
// import {data} from "../tempData/CircularBarplotData"
import axios from "axios";

const MARGIN = 20;
const BAR_PADDING = 0.2;

const topicsUrl = "https://57845aef-505b-40a3-9179-1e48526405db-00-dp6axrnklxf9.sisko.replit.dev/api/v1/topics";

type CircularBarplotProps = {
  width: number;
  height: number;
//   data: { name: string; value: number }[];
};

export const CircularBarplot = ({
  width,
  height,
}: CircularBarplotProps) => {

    const data = getData(topicsUrl);

      const innerRadius = 200;
      const outerRadius = Math.min(width, height) / 2 - MARGIN;
    
      const groups = data.sort((a, b) => b.value - a.value).map((d) => d.name);
      const xScale = useMemo(() => {
        return d3
          .scaleBand()
          .domain(groups)
          .range([0, 2 * Math.PI])
          .padding(BAR_PADDING);
      }, [data, height, width]);
    
      const yScale = useMemo(() => {
        const max = d3.max(data.map((d) => d.value));
        return d3
          .scaleRadial()
          .domain([0, max || 10])
          .range([innerRadius, outerRadius]);
      }, [data, width, height]);
    
      // Build the shapes
      const arcPathGenerator = d3.arc();
      const allShapes = data.map((group, i) => {
        const path = arcPathGenerator({
          innerRadius: innerRadius,
          outerRadius: yScale(group.value)+3,
          startAngle: 0.75+(xScale(group.name) || 0),
          endAngle: 0.75+(xScale(group.name) || 0 + xScale.bandwidth()),
        });
    
        const barAngle = .75+(xScale(group.name) || 0 + xScale.bandwidth()) / 1; // (in Radian)
        const turnLabelUpsideDown = (barAngle + Math.PI) % (2 * Math.PI) < Math.PI;
        const labelRotation = (barAngle * 180) / Math.PI - 90; // (convert radian to degree)
        const labelXTranslation = yScale(group.value) + 10;
        const labelTransform =
          "rotate(" +
          labelRotation +
          ")" +
          ",translate(" +
          labelXTranslation +
          ",0)";
    
        return (
          <g key={i}>
            <path
              d={path || undefined}
              opacity={0.7}
              stroke="#9d174d"
              fill="#9d174d"
              fillOpacity={0.3}
              strokeWidth={1}
              rx={1}
            />
            <g transform={labelTransform}>
              <text
                textAnchor={turnLabelUpsideDown ? "end" : "start"}
                alignmentBaseline="middle"
                fontSize={16}
                transform={turnLabelUpsideDown ? "rotate(180)" : "rotate(0)"}
              >
                {group.name}
              </text>
            </g>
          </g>
        );
      });
    
      return (
        <div>
          <svg width={width} height={height}>
            <g transform={"translate(" + width / 2 + "," + height / 2 + ")"}>
              {allShapes}
            </g>
          </svg>
        </div>
      );
};

type Data = { name: string; value: number }[]
// data fetch module
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
    