import { act, renderHook } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';

import api from '../../services/api';

import { WeatherProvider, useWeather } from '../../hooks/Weather';
import {
  emptyWeatherData,
  apiWeatherResponseMock,
  apiOnecallResponseMock,
  updatedWeatherData,
} from '../../utils/mockData';

const apiMock = new MockAdapter(api);

jest.mock('../../components/ChangeCityModal', () => () => null);
jest.mock('../../components/LoadingModal', () => () => null);
jest.mock('date-fns', () => ({
  isBefore() {
    return false;
  },
  getHours() {
    return 23;
  },
}));

describe('Weather hook', () => {
  it('should be able to fetch daytime', async () => {
    const { result } = renderHook(() => useWeather(), {
      wrapper: WeatherProvider,
    });

    apiMock.onGet('/weather').reply(200, apiWeatherResponseMock);
    apiMock.onGet('/onecall').reply(200, apiOnecallResponseMock);

    await act(() => result.current.fetchWeatherData('Test'));
    act(() => result.current.setIsLoadingBackground(false));

    expect(result.current.weatherData).toEqual(updatedWeatherData);
    expect(result.current.hasError).toEqual(false);
  });

  it('should maintain weatherData something went wrong', async () => {
    const { result } = renderHook(() => useWeather(), {
      wrapper: WeatherProvider,
    });

    apiMock.onGet('/weather').reply(500, apiWeatherResponseMock);

    await act(() => result.current.fetchWeatherData('Test'));

    expect(result.current.weatherData).toEqual(emptyWeatherData);
    expect(result.current.hasError).toEqual(true);
  });

  it('should be able to retrieve weather data', () => {
    const { result } = renderHook(() => useWeather(), {
      wrapper: WeatherProvider,
    });

    expect(result.current.weatherData).toEqual(emptyWeatherData);
  });
});
