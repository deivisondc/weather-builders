import { useState } from 'react';
import { format } from 'date-fns';

import { useWeather } from '../../hooks/Weather';
import Button from '../Button';

import { getLogo, getImageText } from '../../utils/imageMapper';

import styles from './styles.module.scss';

export default function DisplaySection() {
  const { weatherData, toggleModal } = useWeather();

  return (
    <section data-testid="display-section-test" className={styles.section}>
      <img src={getLogo()} alt="Platform Builers logo" />

      <div className={styles.content}>
        <h2>{weatherData.current.temp}</h2>

        <div>
          <p>{getImageText(weatherData.current.main).title}</p>
          <p>{getImageText(weatherData.current.main).subtitle}</p>
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
