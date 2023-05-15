import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import LineGraph from './LineGraph';
import Map from './Map';

interface GlobalData {
  cases: number;
  deaths: number;
  recovered: number;
}

interface CountryData {
  country: string;
  cases: number;
  deaths: number;
  recovered: number;
  countryInfo: {
    lat: number;
    long: number;
  };
}

const ChartsAndMaps: React.FC = () => {
  const { data: globalData } = useQuery<GlobalData>('globalData', async () => {
    const response = await axios.get('https://disease.sh/v3/covid-19/all');
    return response.data;
  });

  const { data: countriesData } = useQuery<CountryData[]>(
    'countriesData',
    async () => {
      const response = await axios.get(
        'https://disease.sh/v3/covid-19/countries'
      );
      return response.data;
    }
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">COVID-19 Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-lg font-bold mb-2">Global Cases</h2>
          {globalData && (
            <div className="bg-white p-4 rounded shadow">
              <p>Total Cases: {globalData.cases}</p>
              <p>Total Deaths: {globalData.deaths}</p>
              <p>Total Recovered: {globalData.recovered}</p>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-lg font-bold mb-2">Line Graph</h2>
          <div className="bg-white p-4 rounded shadow">
            <LineGraph />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-bold mb-2">Cases by Country</h2>
        <div className="bg-white p-4 rounded shadow">
          {/* {countriesData && (
            <Map countriesData={countriesData} />
          )} */}
        </div>
      </div>
    </div>
  );
};

export default ChartsAndMaps;