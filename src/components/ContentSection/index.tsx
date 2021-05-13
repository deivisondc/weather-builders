import Header from '../Header';
import Table from '../Table';
import Chart from '../Chart';

import styles from './styles.module.scss';

export default function ContentSection() {
  const weatherData = [
    { label: 'Clouds', value: '99%' },
    { label: 'Preciptation', value: '10%' },
    { label: 'Humidity', value: '43%' },
    { label: 'Wind', value: '5 km/h' },
  ];
  const forecastData = [
    { label: 'Tuesday', value: '10°' },
    { label: 'Wednesday', value: '10°' },
    { label: 'Thursday', value: '10°' },
    { label: 'Friday', value: '10°' },
    { label: 'Saturday', value: '10°' },
    { label: 'Sunday', value: '10°' },
    { label: 'Monday', value: '10°' },
  ];

  return (
    <section className={styles.section}>
      <Header />

      <div className={styles.content}>
        <section className={styles.subsection}>
          <h3>Weather details</h3>

          <Table data={weatherData} />
        </section>
        <section className={styles.subsection}>
          <h3>Temperature</h3>

          <Chart
            data={[20, 11, 15, 23, 9]}
            categories={['1', '2', '3', '4', '5']}
            height="160"
          />
        </section>
        <section className={styles.subsection}>
          <h3>Next days</h3>

          <Table data={forecastData} />
        </section>
      </div>
    </section>
  );
}
