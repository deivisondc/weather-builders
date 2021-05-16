import { useWeather } from '../../hooks/Weather';
import Button from '../Button';

import styles from './styles.module.scss';

export default function Header() {
  const { weatherData, toggleModal } = useWeather();

  return (
    <section className={styles.section}>
      <div>
        <span>City</span>
        <h2>{weatherData.location}</h2>
      </div>

      <Button onClick={toggleModal}>change</Button>
    </section>
  );
}
