import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useMemo } from "react";
import dayjs from "dayjs";

const GrowthChart = ({ userData, isLoading }) => {
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

    if (!isLoading && userData?.data?.result) {
      userData?.data?.result.forEach((user) => {
        const month = dayjs(user.createdAt).format("MMM");
        if (monthMap[month] !== undefined) {
          monthMap[month] += 1;
        }
      });
    }

    const maxUsers = Math.max(...Object.values(monthMap), 0) + 4;

    return {
      monthlyData: Object.keys(monthMap).map((month) => ({
        name: month,
        uv: monthMap[month],
      })),
      maxUsers,
    };
  }, [userData, isLoading]);

  return (
    <div
      style={{
        width: "100%",
        height: "300px",
        backgroundColor: "#f7fbff",
        borderRadius: "10px",
        padding: "10px",
      }}
    >
      <h3
        style={{
          textAlign: "left",
          marginBottom: "20px",
          color: "#333",
          fontWeight: "bold",
        }}
      >
        User Growth
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={monthlyData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#b3e5fc" />
          <XAxis dataKey="name" stroke="#333" />
          <YAxis stroke="#333" domain={[0, maxUsers]} />
          <Tooltip />
          <Bar
            dataKey="uv"
            fill="#29b6f6"
            barSize={50}
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GrowthChart;
