/* eslint-disable react/prop-types */
import ProgressBarCustom from './ProgressBarCustom';
import { CiCircleCheck } from 'react-icons/ci';
import { Cell, Legend, Pie, PieChart } from 'recharts';
import { Tooltip } from 'antd';
import { PiWarningCircleThin } from 'react-icons/pi';
import energy from '../../assets/energy.svg';
function ResultOfWhyUser({ user }) {
  // console.log(user);
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28EF6'];

  if (!user) {
    return (
      <div className="text-center text-gray-600">No user data available.</div>
    );
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl text-center font-bold mb-4">
        This is the WHY data of {user.user?.name || 'Unknown User'}
      </h1>

      <div className="border-b-2 pb-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">WHY Analysis</h2>

        {/* Initial Summary Section */}
        {user.initialSummary && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Summary</h3>
            <p className="text-gray-700">{user.initialSummary}</p>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="w-full justify-between flex flex-col md:flex-row">
            {/* Key Points Section */}
            {user.keyPoints && (
              <div className="w-full md:w-1/2">
                <h4 className="text-lg font-semibold mb-2">Key Points:</h4>
                <ul className="list-disc list-inside text-gray-700">
                  {user.keyPoints.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recharts Pie Chart */}
            {user.pieChartData && (
              <div className="md:w-1/2 flex md:flex-row flex-col justify-center">
                <PieChart width={300} height={300}>
                  <Pie
                    data={user.pieChartData}
                    dataKey="percentage"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                  >
                    {user.pieChartData?.map((entry, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </div>
            )}
          </div>
        </div>

        {/* Strengths Section */}
        {user.strengths && (
          <div>
            <h1 className="text-2xl md:text-4xl font-bold">Your Strengths</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-6 md:p-4">
              {user.strengths.map((strength, idx) => (
                <div key={idx} className="p-4 flex flex-col items-start gap-2">
                  <h1 className="text-xl font-bold text-gray-800">
                    {strength.title}
                  </h1>
                  <div className="flex items-start gap-3">
                    <CiCircleCheck
                      style={{ fontSize: '40px', color: '#00B0F2' }}
                    />
                    <p className="text-gray-600">{strength.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Weaknesses Section */}
        {user.weaknesses.length > 0 && (
          <div className="mt-12">
            <h1 className="text-2xl md:text-4xl font-bold">Your Weaknesses</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-6 md:p-4">
              {user.weaknesses.map((weakness, idx) => (
                <div key={idx} className="p-4 flex flex-col items-start gap-2">
                  <h1 className="text-xl font-bold text-gray-800">
                    {weakness.title}
                  </h1>
                  <div className="flex items-start gap-3">
                    <PiWarningCircleThin
                      style={{ fontSize: '50px', color: '#ffa337' }}
                    />
                    <p className="text-gray-600">{weakness.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Progress Bar Section */}
        <div className="flex my-12 items-center md:flex-row flex-col justify-between">
          {user?.progressBarData && (
            <div className="w-full flex-1">
              <ProgressBarCustom data={user.progressBarData} />
            </div>
          )}
          {user.finalSummary && (
            <div className="flex-1 flex flex-col items-center bg-[#dbeffd] rounded-md p-12 gap-2 text-center">
              <img src={energy} alt="Eergy" className="w-48 h-48" />
              <p>Energy</p>
              <h1 className="text-xl font-bold">70% Summary of Findings</h1>
              <p className="opacity-75">{user.finalSummary}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResultOfWhyUser;
