import DisplaySection from '../DisplaySection';
import ContentSection from '../ContentSection';

import styles from './styles.module.scss';

export default function Dashboard() {
  return (
    <div className={styles.content}>
      <DisplaySection />
      <ContentSection />
    </div>
  );
}
