import {
  ReactNode,
  useState,
  useCallback,
  useContext,
  createContext,
} from 'react';
import { isBefore } from 'date-fns';

import ChangeCityModal from '../components/ChangeCityModal';
import LoadingModal from '../components/LoadingModal';
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
  hasError: boolean;
  weatherData: WeatherData;
  fetchWeatherData: (location: string) => Promise<void>;
  toggleModal: () => void;
}

const WeatherContext = createContext<WeatherContextData>(
  {} as WeatherContextData,
);

export const WeatherProvider: React.FC = ({
  children,
}: WeatherProviderProps) => {
  const [isFetching, setIsFetching] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = useCallback(() => {
    setIsModalOpen(!isModalOpen);
  }, [isModalOpen]);

  const fetchWeatherData = useCallback(async location => {
    try {
    if (location) {
        setIsFetching(true);
        const paramsWeather = {
          q: location,
          appid: process.env.NEXT_PUBLIC_API_KEY,
          units: 'metric',
        };

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
      }
    } catch (err) {
      setHasError(true);
        setIsFetching(false);
    }
  }, []);
      }
    }
  }, [location]);

  return (
    <WeatherContext.Provider
      value={{
        isFetching,
        hasError,
        fetchWeatherData,
        toggleModal,
      }}
    >
      {children}

      <ChangeCityModal isOpen={!isFetching && isModalOpen} />
      <LoadingModal isOpen={isFetching} />
    </WeatherContext.Provider>
  );
};

export const useWeather = (): WeatherContextData => {
  const context = useContext(WeatherContext);

  return context;
};
