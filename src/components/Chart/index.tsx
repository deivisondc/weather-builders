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
  const [series] = useState([{ name: 'temp', data }]);
  const [options, setOptions] = useState(baseConfig);

  useEffect(() => {
    setOptions({
      ...options,
      xaxis: { ...options.xaxis, categories },
    });
  }, [options, categories]);

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
