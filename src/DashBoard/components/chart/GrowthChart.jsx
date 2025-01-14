import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", uv: 800 },
  { name: "Feb", uv: 200 },
  { name: "Mar", uv: 900 },
  { name: "Apr", uv: 700 },
  { name: "May", uv: 300 },
  { name: "Jun", uv: 800 },
  { name: "Jul", uv: 400 },
  { name: "Aug", uv: 500 },
  { name: "Sep", uv: 900 },
  { name: "Oct", uv: 1000 },
  { name: "Nov", uv: 100 },
  { name: "Dec", uv: 800 },
];

const GrowthChart = () => {
  return (
    <div style={{ width: "100%", height: "300px", backgroundColor: "#f7fbff", borderRadius: "10px", padding: "10px" }}>
      <h3 style={{ textAlign: "left", marginBottom: "20px", color: "#333", fontWeight: "bold" }}>
        Why Pursue Growth
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#b3e5fc" />
          <XAxis dataKey="name" stroke="#333" />
          <YAxis stroke="#333" />
          <Tooltip />
          {/* Adjust barSize to increase bar width */}
          <Bar dataKey="uv" fill="#29b6f6" barSize={50} radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GrowthChart;
