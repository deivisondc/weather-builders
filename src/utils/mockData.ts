export const emptyWeatherData = {
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
};

export const apiWeatherResponseMock = {
  name: 'Test Location',
  weather: [{ main: 'Clouds' }],
  coord: {
    lat: '1000',
    lon: '2000',
  },
  token: 'token-123',
};

export const apiOnecallResponseMock = {
  current: {
    weather: [{ main: 'Clouds' }],
    temp: 10,
    humidity: 25,
    wind_speed: 3,
    clouds: 88,
  },
  hourly: [
    { dt: 1612148410000, temp: 10 },
    { dt: 1612148420000, temp: 11 },
    { dt: 1612148430000, temp: 12 },
    { dt: 1612148440000, temp: 13 },
    { dt: 1612148450000, temp: 14 },
    { dt: 1612148460000, temp: 15 },
    { dt: 1612148470000, temp: 16 },
    { dt: 1612148480000, temp: 17 },
    { dt: 1612148490000, temp: 18 },
    { dt: 1612148411000, temp: 19 },
    { dt: 1612148412000, temp: 20 },
    { dt: 1612148413000, temp: 21 },
    { dt: 1612148414000, temp: 22 },
    { dt: 1612148415000, temp: 23 },
    { dt: 1612148416000, temp: 24 },
  ],
  daily: [
    { dt: 1612148400000, temp: { day: 9 }, pop: 0.1 },
    { dt: 1612155600000, temp: { day: 8 }, pop: 0.2 },
    { dt: 1612162800000, temp: { day: 6 }, pop: 0.2 },
    { dt: 1612170000000, temp: { day: 7 }, pop: 0.2 },
    { dt: 1612177200000, temp: { day: 5 }, pop: 0.2 },
    { dt: 1612184400000, temp: { day: 4 }, pop: 0.2 },
    { dt: 1612191600000, temp: { day: 3 }, pop: 0.2 },
  ],
};

export const updatedWeatherData = {
  location: 'Test Location',
  backgroundImage: 'NightCloudy.jpg',
  current: {
    main: 'Clouds',
    temp: '10°',
    humidity: '25%',
    wind: '3 km/h',
    clouds: '88%',
    pop: '10%',
    temperatures: [
      { dt: 1612148420000, temp: 11 },
      { dt: 1612148440000, temp: 13 },
      { dt: 1612148460000, temp: 15 },
      { dt: 1612148480000, temp: 17 },
      { dt: 1612148411000, temp: 19 },
      { dt: 1612148413000, temp: 21 },
      { dt: 1612148415000, temp: 23 },
    ],
  },
  forecast: [
    { dt: 1612155600000, temp: '8°' },
    { dt: 1612162800000, temp: '6°' },
    { dt: 1612170000000, temp: '7°' },
    { dt: 1612177200000, temp: '5°' },
    { dt: 1612184400000, temp: '4°' },
    { dt: 1612191600000, temp: '3°' },
  ],
};
