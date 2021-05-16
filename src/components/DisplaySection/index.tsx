import { useState } from 'react';
import { format } from 'date-fns';

import { useWeather } from '../../hooks/Weather';
import Button from '../Button';

import { getLogo } from '../../utils/imageMapper';

import styles from './styles.module.scss';

export default function DisplaySection() {
  const { weatherData, toggleModal } = useWeather();

  const [title] = useState('Today is so cloudy');
  const [subtitle] = useState("Don't expect to see the sun");

  return (
    <section className={styles.section}>
      <img src={getLogo()} alt="Platform Builers logo" />

      <div className={styles.content}>
        <h2>{weatherData.current.temp}</h2>

        <div>
          <p>{title}</p>
          <p>{subtitle}</p>
        </div>
      </div>

      <div className={styles.footer}>
        <p>{format(Date.now(), 'iiii, dd MMM yyyy')}</p>
        <div>
          <p>{weatherData.location}</p>
          <Button onClick={toggleModal}>change</Button>
        </div>
      </div>
    </section>
  );
}
