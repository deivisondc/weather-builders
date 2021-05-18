import { useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';

import { useWeather } from '../hooks/Weather';
import Dashboard from '../components/Dashboard';

import styles from '../styles/Home.module.scss';

export default function Home() {
  const {
    setIsLoadingBackground,
    fetchWeatherData,
    commitWeatherData,
    backgroundImage,
    weatherData,
  } = useWeather();

  useEffect(() => {
    fetchWeatherData('São Paulo');
  }, [fetchWeatherData]);

  return (
    <>
      <Head>
        <title>
          Weather | {weatherData.location} ({weatherData.current.temp}){' '}
        </title>
      </Head>
      {backgroundImage && (
        <>
          <div className={styles.bgWrap}>
            <Image
              alt="Background"
              src={`/images/${backgroundImage}`}
              layout="fill"
              objectFit="cover"
              quality={100}
              priority
              onLoad={() => {
                commitWeatherData();
                setIsLoadingBackground(false);
              }}
            />
          </div>
          <div className={styles.wrapper}>
            <Dashboard />
          </div>
        </>
      )}
    </>
  );
}
