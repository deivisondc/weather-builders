import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

import baseConfig from './config';

const ApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

interface ChartProps {
  data: number[];
  categories: string[];
  height: string | number;
}

export default function Chart({
  data,
  categories,
  height,
  ...rest
}: ChartProps) {
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({});

  useEffect(() => {
    setSeries([{ name: 'temp', data }]);
    setOptions({
      ...baseConfig,
      xaxis: { ...baseConfig.xaxis, categories },
    });
  }, [data, categories]);

  return (
    <ApexChart
      options={options}
      series={series}
      type="area"
      height={height}
      {...rest}
    />
  );
}
