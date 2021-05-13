import { useState } from 'react';

import Button from '../Button';

import styles from './styles.module.scss';

export default function DisplaySection() {
  const [title] = useState('Today is so cloudy');
  const [subtitle] = useState("Don't expect to see the sun");

  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <h2>16°</h2>

        <div>
          <p>{title}</p>
          <p>{subtitle}</p>
        </div>
      </div>

      <div className={styles.footer}>
        <p>Bauru, Brazil</p>

        <Button>change</Button>
      </div>
    </section>
  );
}
