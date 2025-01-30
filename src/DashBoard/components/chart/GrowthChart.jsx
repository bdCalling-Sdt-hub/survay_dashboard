import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useEffect, useMemo, useState } from "react";
import { Select } from "antd";
import { useGetOverViewsQuery } from "../../../redux/services/metaApis";

const GrowthChart = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const [years, setYears] = useState([]);

  useEffect(() => {
    const startYear = 2024;
    const yearsArray = Array.from(
      { length: currentYear - startYear + 1 },
      (_, index) => startYear + index
    );
    setYears(yearsArray);
  }, [currentYear]);

  const { data, isLoading } = useGetOverViewsQuery(year);

  const { monthlyData, maxUsers } = useMemo(() => {
    const monthMap = {
      Jan: 0,
      Feb: 0,
      Mar: 0,
      Apr: 0,
      May: 0,
      Jun: 0,
      Jul: 0,
      Aug: 0,
      Sep: 0,
      Oct: 0,
      Nov: 0,
      Dec: 0,
    };

    if (!isLoading && data?.data) {
      data.data.forEach(({ month, totalUser }) => {
        if (month in monthMap) {
          monthMap[month] = totalUser;
        }
      });
    }

    const maxUsers = Math.max(...Object.values(monthMap), 0) + 4;

    return {
      monthlyData: Object.keys(monthMap).map((month) => ({
        name: month,
        totalUser: monthMap[month],
      })),
      maxUsers,
    };
  }, [data, isLoading, year]);

  return (
    <div
      style={{
        width: "100%",
        height: "350px",
        backgroundColor: "#fff",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h3
        style={{
          textAlign: "left",
          marginBottom: "15px",
          color: "#333",
          fontWeight: "bold",
          fontSize: "18px",
        }}
      >
        📈 User Growth Chart
      </h3>
      <Select
        className="min-w-32"
        value={year}
        placeholder="Select year"
        onChange={setYear}
        style={{
          marginBottom: "15px",
          width: "150px",
          fontWeight: "500",
        }}
        options={years.map((item) => ({ value: item, label: item }))}
      />
      <ResponsiveContainer width="100%" height="85%">
        <BarChart
          data={monthlyData}
          margin={{ top: 20, right: 20, left: 0, bottom: 10 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1DB7F2" stopOpacity={0.9} />
              <stop offset="95%" stopColor="#1DB7F2" stopOpacity={0.3} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
          <XAxis
            dataKey="name"
            stroke="#333"
            tick={{ fontSize: 12, fontWeight: 500 }}
          />
          <YAxis
            stroke="#333"
            domain={[0, maxUsers]}
            tick={{ fontSize: 12, fontWeight: 500 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "8px",
            }}
            cursor={{ fill: "rgba(76, 175, 80, 0.1)" }}
          />
          <Legend wrapperStyle={{ fontSize: "13px", fontWeight: "bold" }} />
          <Bar
            dataKey="totalUser"
            fill="url(#colorUv)"
            barSize={45}
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GrowthChart;
