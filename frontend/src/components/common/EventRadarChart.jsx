import {
  LabelList,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import { getTestNameInKorean, scoreTable } from "../../constants";

const getAverageRecordPerTest = (monthlyTests) => {
  const recordsSum = {};
  const counts = {};

  for (const month in monthlyTests) {
    const tests = monthlyTests[month].tests;
    tests.forEach(({ name, record }) => {
      if (!recordsSum[name]) {
        recordsSum[name] = 0;
        counts[name] = 0;
      }
      recordsSum[name] += record;
      counts[name] += 1;
    });
  }

  const averages = {};
  for (const name in recordsSum) {
    averages[name] = Number((recordsSum[name] / counts[name]).toFixed(2));
  }
  return averages;
};

const getMaxRecordPerTest = (monthlyTests) => {
  const maxRecords = {};

  for (const month in monthlyTests) {
    const tests = monthlyTests[month].tests;
    tests.forEach(({ name, record }) => {
      if (!maxRecords[name] || record > maxRecords[name]) {
        maxRecords[name] = record;
      }
    });
  }

  return maxRecords;
};

const convertToRadarData = (data, gender) => {
  const fullmarks = {};

  for (const testName in scoreTable) {
    const { higherIsBetter, male, female } = scoreTable[testName];

    const scoreList = gender === "male" ? [...male] : [...female];
    const fullRecordItem = scoreList.find((item) => item.score === 100);

    const record =
      fullRecordItem?.record ??
      (higherIsBetter
        ? Math.max(...scoreList.map((s) => s.record))
        : Math.min(...scoreList.map((s) => s.record)));

    fullmarks[testName] = { fullMark: record, higherIsBetter };
  }

  return Object.entries(data)
    .map(([name, value]) => {
      const mark = fullmarks[name];
      if (!mark) return null;

      const { higherIsBetter, fullMark } = mark;

      let convertValue;
      if (higherIsBetter) {
        convertValue = (value / fullMark) * 100;
      } else {
        convertValue = (fullMark / value) * 100;
      }

      return {
        name: name,
        convertValue: Number(convertValue.toFixed(2)),
        rawValue: value,
        fullMark: 100,
      };
    })
    .filter(Boolean);
};

export default function EventRadarChart({ monthlyTests, gender, type }) {
  const data =
    type === "avg"
      ? getAverageRecordPerTest(monthlyTests)
      : getMaxRecordPerTest(monthlyTests);
  const radarData = convertToRadarData(data, gender);

  const customLabel = ({ x, y, value }) => {
    if (!value) return null;

    return (
      <text
        x={x}
        y={y - 10}
        fill="oklch(0 0 219)"
        fontSize={12}
        fontWeight="500"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {value}
      </text>
    );
  };

  return (
    <div className="w-full h-80">
      <h2 className="text-sm ml-10">
        {type === "avg" ? "종목별 평균 실기능력" : "종목별 최고기록"}
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
          <PolarGrid />
          <PolarAngleAxis
            dataKey="name"
            tick={{ fontSize: 12 }}
            tickFormatter={(name) => getTestNameInKorean(name)}
          />
          <PolarRadiusAxis tick={false} tickCount={10} />
          <Radar
            name="mike"
            dataKey="convertValue"
            stroke={
              type === "avg"
                ? "oklch(76.5% 0.177 163.223)"
                : "oklch(70.7% 0.165 254.624)"
            }
            fill={
              type === "avg"
                ? "oklch(76.5% 0.177 163.223)"
                : "oklch(70.7% 0.165 254.624)"
            }
            fillOpacity={0.3}
          >
            <LabelList dataKey="rawValue" content={customLabel} />
          </Radar>
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
