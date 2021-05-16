import { useState, useEffect } from 'react';

import { format, fromUnixTime } from 'date-fns';

import { useWeather } from '../../hooks/Weather';
import Header from '../Header';
import Table from '../Table';
import Chart from '../Chart';

import styles from './styles.module.scss';

export default function ContentSection() {
  const { weatherData } = useWeather();
  const [chartData, setChartData] = useState([]);
  const [chartCategories, setChartCategories] = useState([]);

  useEffect(() => {
    if (weatherData.current.temperatures) {
      setChartData(weatherData.current.temperatures.map(data => data.temp));
      setChartCategories(
        weatherData.current.temperatures.map(data =>
          format(fromUnixTime(data.dt), 'HH:mm'),
        ),
      );
    }
  }, [weatherData]);

  const weatherDetailsData = [
    { label: 'Clouds', value: weatherData.current.clouds },
    { label: 'Preciptation', value: weatherData.current.pop },
    { label: 'Humidity', value: weatherData.current.humidity },
    { label: 'Wind', value: weatherData.current.wind },
  ];

  const forecastData = weatherData.forecast.map(data => ({
    label: format(fromUnixTime(data.dt), 'iiii'),
    value: data.temp,
  }));

  return (
    <section data-testid="content-section-test" className={styles.section}>
      <Header />

      <div className={styles.content}>
        <section className={styles.subsection}>
          <h3>Weather details</h3>

          <Table data={weatherDetailsData} />
        </section>
        <section className={styles.subsection}>
          <h3>Temperature</h3>

          <Chart data={chartData} categories={chartCategories} height="165" />
        </section>
        <section className={styles.subsection}>
          <h3>Next days</h3>

          <Table data={forecastData} />
        </section>
      </div>
    </section>
  );
}
