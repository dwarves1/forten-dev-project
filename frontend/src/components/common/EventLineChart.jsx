import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
} from "recharts";

const getChartDataWithRecord = (monthlyTests, eventName) => {
  const result = Object.entries(monthlyTests)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, data]) => {
      const test = data.tests.find((t) => t.name === eventName);

      return {
        month,
        score: test ? Number(test.score) : 0,
        record: test ? test.record : "-",
      };
    });

  return result;
};

export default function EventLineChart({ monthlyTests, eventName }) {
  const data = getChartDataWithRecord(monthlyTests, eventName);

  const CustomLabel = ({ x, y, value }) => {
    if (!value) return null;
    return (
      <text
        x={x}
        y={y - 10}
        fill="oklch(0 0 219)"
        fontSize={12}
        fontWeight="500"
        textAnchor="middle"
      >
        {value}
      </text>
    );
  };

  return (
    <div className="w-full h-68">
      <h2 className="text-sm ml-10">{eventName}</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 15 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis
            ticks={[74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100]}
            domain={[74, 100]}
            interval={0}
            tick={{ fill: "oklch(55.6% 0 0)", fontSize: 10 }}
          />
          <Line
            type="monotone"
            dataKey="score"
            stroke="oklch(78.9% 0.154 211.53)"
            strokeWidth={1}
          >
            {" "}
            <LabelList dataKey="record" content={CustomLabel} />
          </Line>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
