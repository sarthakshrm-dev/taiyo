import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface GraphData {
  cases: {
    [key: string]: number;
  };
  deaths: {
    [key: string]: number;
  };
  recovered: {
    [key: string]: number;
  };
}

const LineGraph: React.FC = () => {
  const { data: graphData } = useQuery<GraphData>('graphData', async () => {
    const response = await axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
    return response.data;
  });

  if (!graphData) {
    return null;
  }

  const labels = Object.keys(graphData.cases);
  const casesData = Object.values(graphData.cases);
  const deathsData = Object.values(graphData.deaths);
  const recoveredData = Object.values(graphData.recovered);

  const chartData = labels.map((label, index) => ({
    name: label,
    cases: casesData[index],
    deaths: deathsData[index],
    recovered: recoveredData[index],
  }));

  return (
    <div className="line-graph">
      <LineChart width={800} height={400} data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="cases" name="Cases" stroke="blue" dot={false} />
        <Line type="monotone" dataKey="deaths" name="Deaths" stroke="red" dot={false} />
        <Line type="monotone" dataKey="recovered" name="Recovered" stroke="green" dot={false} />
      </LineChart>
    </div>
  );
};

export default LineGraph;