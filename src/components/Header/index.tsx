import Button from '../Button';

import styles from './styles.module.scss';

export default function Header() {
  const city = 'Bauru';

  return (
    <section className={styles.section}>
      <div>
        <span>City</span>
        <h2>{city}</h2>
      </div>

      <Button>change</Button>
    </section>
  );
}
