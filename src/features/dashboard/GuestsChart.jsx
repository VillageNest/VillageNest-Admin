import styled from "styled-components";
import Heading from "../../ui/Heading";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: 1 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

const startDataLight = [
  {
    guests: "1 guest",
    value: 0,
    color: "#ef4444",
  },
  {
    guests: "2 guests",
    value: 0,
    color: "#f97316",
  },
  {
    guests: "3 guests",
    value: 0,
    color: "#eab308",
  },
  {
    guests: "4-5 guests",
    value: 0,
    color: "#84cc16",
  },
  {
    guests: "6-7 guests",
    value: 0,
    color: "#22c55e",
  },
  {
    guests: "8-14 guests",
    value: 0,
    color: "#14b8a6",
  },
  {
    guests: "15-21 guests",
    value: 0,
    color: "#3b82f6",
  },
  {
    guests: "21+ guests",
    value: 0,
    color: "#a855f7",
  },
];

const startDataDark = [
  {
    guests: "1 guest",
    value: 0,
    color: "#b91c1c",
  },
  {
    guests: "2 guests",
    value: 0,
    color: "#c2410c",
  },
  {
    guests: "3 guests",
    value: 0,
    color: "#a16207",
  },
  {
    guests: "4-5 guests",
    value: 0,
    color: "#4d7c0f",
  },
  {
    guests: "6-7 guests",
    value: 0,
    color: "#15803d",
  },
  {
    guests: "8-14 guests",
    value: 0,
    color: "#0f766e",
  },
  {
    guests: "15-21 guests",
    value: 0,
    color: "#1d4ed8",
  },
  {
    guests: "21+ guests",
    value: 0,
    color: "#7e22ce",
  },
];

function prepareData(startData, stays) {
  function incArrayValue(arr, field) {
    return arr.map((obj) =>
      obj.guests === field ? { ...obj, value: obj.value + 1 } : obj
    );
  }

  const data = stays
    .reduce((arr, cur) => {
      const numGuests = cur.numGuests;
      if (numGuests === 1) return incArrayValue(arr, "1 guest");
      if (numGuests === 2) return incArrayValue(arr, "2 guests");
      if (numGuests === 3) return incArrayValue(arr, "3 guests");
      if ([4, 5].includes(numGuests)) return incArrayValue(arr, "4-5 guests");
      if ([6, 7].includes(numGuests)) return incArrayValue(arr, "6-7 guests");
      if (numGuests >= 8 && numGuests <= 14)
        return incArrayValue(arr, "8-14 guests");
      if (numGuests >= 15 && numGuests <= 21)
        return incArrayValue(arr, "15-21 guests");
      if (numGuests >= 21) return incArrayValue(arr, "21+ guests");
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);
  return data;
}

function DurationChart({ confirmedStays }) {
  const { isDarkMode } = useDarkMode();
  const startData = isDarkMode ? startDataDark : startDataLight;
  const data = prepareData(startData, confirmedStays);

  return (
    <ChartBox>
      <Heading as="h2">Guest count summary</Heading>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            nameKey="guests"
            dataKey="value"
            innerRadius={85}
            outerRadius={110}
            cx="40%"
            cy="50%"
            paddingAngle={3}
          >
            {data.map((entry) => (
              <Cell
                fill={entry.color}
                stroke={entry.color}
                key={entry.guests}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="middle"
            align="right"
            width="30%"
            layout="vertical"
            iconSize={15}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default DurationChart;