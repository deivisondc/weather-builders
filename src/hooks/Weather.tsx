import {
  ReactNode,
  useState,
  useEffect,
  useCallback,
  useContext,
  createContext,
} from 'react';
import { isBefore } from 'date-fns';

import ChangeCityModal from '../components/ChangeCityModal';
import LoadingModal from '../components/LoadingModal';

import { getImage } from '../utils/imageMapper';

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
  location: string;
  backgroundImage: string;
  current: CurrentWeatherData;
  forecast: ForecastData[];
}

interface WeatherContextData {
  hasError: boolean;
  weatherData: WeatherData;
  setHasError: (value: boolean) => void;
  commitWeatherData: () => void;
  fetchWeatherData: (location: string) => Promise<void>;
  toggleModal: () => void;
  setIsLoadingBackground: (value: boolean) => void;
  backgroundImage: string;
}

const WeatherContext = createContext<WeatherContextData>(
  {} as WeatherContextData,
);

export const WeatherProvider: React.FC = ({
  children,
}: WeatherProviderProps) => {
  const [isFetching, setIsFetching] = useState(true);
  const [isLoadingBackground, setIsLoadingBackground] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState('');
  const [tempWeatherData, setTempWeatherData] = useState({} as WeatherData);
  const [weatherData, setWeatherData] = useState({
    location: '',
    backgroundImage: '',
    current: {
      main: '',
      temp: `0°`,
      humidity: `0%`,
      wind: `0 km/h`,
      clouds: `0%`,
      pop: `0%`,
      temperatures: [],
    },
    forecast: [],
  } as WeatherData);

  const toggleModal = useCallback(() => {
    setIsModalOpen(!isModalOpen);
  }, [isModalOpen]);

  const commitWeatherData = useCallback(() => {
    setWeatherData(tempWeatherData);
    setIsFetching(false);
    setHasError(false);
    setIsModalOpen(false);
  }, [tempWeatherData]);

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
        const newBackgroundImage = getImage(
          weatherResponse.data.weather[0].main,
        );

        setTempWeatherData({
          location: `${weatherResponse.data.name}`,
          backgroundImage: newBackgroundImage,
          current: {
            main: `${data.current.weather[0].main}`,
            temp: `${Math.round(data.current.temp)}°`,
            humidity: `${Math.round(data.current.humidity)}%`,
            wind: `${Math.round(data.current.wind_speed)} km/h`,
            clouds: `${Math.round(data.current.clouds)}%`,
            pop: `${Math.round(
              data.daily[isDailyForecastOld ? 1 : 0].pop * 100,
            )}%`,
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

  useEffect(() => {
    if (!isLoadingBackground && tempWeatherData.location) {
      if (backgroundImage !== tempWeatherData.backgroundImage) {
        setBackgroundImage(tempWeatherData.backgroundImage);
        setIsLoadingBackground(true);
      } else {
        commitWeatherData();
      }
    }
  }, [
    backgroundImage,
    tempWeatherData,
    commitWeatherData,
    isLoadingBackground,
  ]);

  return (
    <WeatherContext.Provider
      value={{
        hasError,
        setHasError,
        weatherData,
        fetchWeatherData,
        toggleModal,
        backgroundImage,
        commitWeatherData,
        setIsLoadingBackground,
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
