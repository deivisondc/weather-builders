import Image from 'next/image';

import styles from '../styles/Home.module.scss';

export default function Home() {
  return (
    <>
      <div className={styles.bgWrap}>
        <Image
          alt="Background"
          src="/images/Cloudy.jpg"
          layout="fill"
          objectFit="cover"
          quality={100}
      />
    </div>
    </>
  );
}
