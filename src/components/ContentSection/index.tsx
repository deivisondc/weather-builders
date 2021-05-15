import { useMemo } from 'react';

import { format, fromUnixTime } from 'date-fns';

import { useWeather } from '../../hooks/Weather';
import Header from '../Header';
import Table from '../Table';
import Chart from '../Chart';

import styles from './styles.module.scss';

export default function ContentSection() {
  const { isFetching, weatherData } = useWeather();

  const weatherDetailsData = [
    { label: 'Clouds', value: !isFetching && weatherData.current.clouds },
    { label: 'Preciptation', value: !isFetching && weatherData.current.pop },
    { label: 'Humidity', value: !isFetching && weatherData.current.humidity },
    { label: 'Wind', value: !isFetching && weatherData.current.wind },
  ];

  const forecastData = !isFetching
    ? weatherData.forecast.map(data => ({
        label: format(fromUnixTime(data.dt), 'iiii'),
        value: data.temp,
      }))
    : [];

  const chartData = useMemo(
    () =>
      !isFetching
        ? weatherData.current.temperatures.map(data => data.temp)
        : [],
    [isFetching, weatherData],
  );

  const chartCategories = useMemo(
    () =>
      !isFetching
        ? weatherData.current.temperatures.map(data =>
            format(fromUnixTime(data.dt), 'HH:mm'),
          )
        : [],
    [isFetching, weatherData],
  );

  const Test = useMemo(() => {
    return <Chart data={chartData} categories={chartCategories} height="165" />;
  }, [chartData, chartCategories]);

  if (isFetching) {
    return null;
  }

  return (
    <section className={styles.section}>
      <Header />

      <div className={styles.content}>
        <section className={styles.subsection}>
          <h3>Weather details</h3>

          <Table data={weatherDetailsData} />
        </section>
        <section className={styles.subsection}>
          <h3>Temperature</h3>

          {Test}
        </section>
        <section className={styles.subsection}>
          <h3>Next days</h3>

          <Table data={forecastData} />
        </section>
      </div>
    </section>
  );
}
