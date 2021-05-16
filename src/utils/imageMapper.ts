import { getHours } from 'date-fns';

function isDaytime() {
  const hour = getHours(new Date());
  return hour >= 6 && hour <= 18;
}

export function getLogo() {
  if (isDaytime()) {
    return 'https://platformbuilders.io/assets/images/logo.png';
  }

  return 'https://platformbuilders.io/assets/images/logo-bc.svg';
}

export function getImage(weather: string) {
  const availableImages = {
    clouds: `Cloudy.jpg`,
    snow: `Snowy.jpg`,
    thunderstorm: `Rainy.jpg`,
    drizzle: `Rainy.jpg`,
    rain: `Rainy.jpg`,
    clear: `Clear.jpg`,
  };

  const image = availableImages[weather.toLowerCase()] || availableImages.clear;

  return isDaytime() ? image : `Night${image}`;
}
