import React from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

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

interface MapProps {
  countriesData: CountryData[];
}

const Map: React.FC<MapProps> = ({ countriesData }) => {

  const geoUrl = 'https://path/to/your/geojson_or_topojson_file.json';
  return (
    <div style={{ width: '100%', height: '400px' }}>
      <ComposableMap projection="geoMercator" projectionConfig={{ scale: 120 }}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#EAEAEC"
                stroke="#D6D6DA"
              />
            ))
          }
        </Geographies>
        {countriesData.map((country) => (
          <circle
            key={country.country}
            cx={country.countryInfo.long}
            cy={country.countryInfo.lat}
            r={2}
            fill="red"
          />
        ))}
      </ComposableMap>
    </div>
  );
};

export default Map;