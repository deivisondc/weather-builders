import styles from '../styles/Home.module.scss';

import Chart from '../components/Chart';

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>Teste</h1>

      <Chart
        data={[1, 2, 3, 4, 5]}
        categories={['a', 'b', 'c', 'd', 'e']}
        height="160"
      />
    </div>
  );
}
