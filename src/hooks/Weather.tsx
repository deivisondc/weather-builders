import {
  ReactNode,
  useState,
  useCallback,
  useContext,
  createContext,
} from 'react';
import { isBefore } from 'date-fns';

import api from '../services/api';

interface WeatherProviderProps {
  children: ReactNode;
}

interface ForecastData {
  dt: number;
  temp: string;
}

interface TemperaturesData {
  dt: number;
  temp: number;
}

interface CurrentWeatherData {
  main: string;
  temp: string;
  humidity: string;
  wind: string;
  clouds: string;
  pop: string;
  temperatures: TemperaturesData[];
}

interface WeatherData {
  current: CurrentWeatherData;
  forecast: ForecastData[];
}

interface WeatherContextData {
  location: string;
  isFetching: boolean;
  weatherData: WeatherData;
  fetchWeatherData: () => void;
}

const WeatherContext = createContext<WeatherContextData>(
  {} as WeatherContextData,
);

export const WeatherProvider: React.FC = ({
  children,
}: WeatherProviderProps) => {
  const [isFetching, setIsFetching] = useState(true);
  const [location, setLocation] = useState('Bauru');
  const [weatherData, setWeatherData] = useState({} as WeatherData);

  const fetchWeatherData = useCallback(async () => {
    if (location) {
      try {
        const paramsWeather = {
          q: location,
          appid: process.env.NEXT_PUBLIC_API_KEY,
          units: 'metric',
        };
        // const requests = [
        const weatherResponse = await api.get(`weather`, {
          params: paramsWeather,
        });

        const paramsOneCall = {
          ...paramsWeather,
          q: undefined,
          lat: weatherResponse.data.coord.lat,
          lon: weatherResponse.data.coord.lon,
          exclude: 'minutely,alerts',
        };

        const consolidatedWeatherResponse = await api.get(`onecall`, {
          params: paramsOneCall,
        });

        const { data } = consolidatedWeatherResponse;

        const isDailyForecastOld = isBefore(data.daily[0].dt, Date.now());

        setWeatherData({
          current: {
            main: `${data.current.weather[0].main}`,
            temp: `${Math.round(data.current.temp)}°`,
            humidity: `${data.current.humidity}%`,
            wind: `${Math.round(data.current.wind_speed)} km/h`,
            clouds: `${data.current.clouds}%`,
            pop: `${data.daily[isDailyForecastOld ? 1 : 0].pop * 100}%`,
            temperatures: data.hourly
              .slice(1, 14)
              .filter((_, index) => index % 2 === 0)
              .map(forecastData => ({
                dt: forecastData.dt,
                temp: Math.round(forecastData.temp),
              })),
          },
          forecast: data.daily.slice(1, 8).map(forecastData => ({
            dt: forecastData.dt,
            temp: `${Math.round(forecastData.temp.day)}°`,
          })),
        });

        setIsFetching(false);
      } catch (err) {
        console.error(err);
        setWeatherData({} as WeatherData);
      }
    }
  }, [location]);

  return (
    <WeatherContext.Provider
      value={{ isFetching, location, weatherData, fetchWeatherData }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = (): WeatherContextData => {
  const context = useContext(WeatherContext);

  return context;
};
