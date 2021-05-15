import { AppProps } from 'next/app';

import { WeatherProvider } from '../hooks/Weather';

import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WeatherProvider>
      <Component {...pageProps} />;
    </WeatherProvider>
  );
}

export default MyApp;
