import DisplaySection from '../DisplaySection';
import ContentSection from '../ContentSection';

import styles from './styles.module.scss';

export default function Dashboard() {
  return (
    <div className={styles.content}>
      <div className={styles.scrollableContainer}>
        <DisplaySection />
        <ContentSection />
      </div>
    </div>
  );
}
