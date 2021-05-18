import { getHours } from 'date-fns';

function isDaytime() {
  const hour = getHours(new Date());
  return hour >= 6 && hour < 18;
}

export function getLogo() {
  if (isDaytime()) {
    return 'https://platformbuilders.io/assets/images/logo.png';
  }

  return 'https://platformbuilders.io/assets/images/logo-bc.svg';
}

export function getImageText(weather: string) {
  const texts = {
    clouds: {
      title: 'Today is so cloudy',
      subtitle: `Don't expect to see the ${
        isDaytime() ? 'sun' : 'stars'
      } today`,
    },
    snow: {
      title: 'Today is snowing',
      subtitle: 'Wrap up before leaving home',
    },
    thunderstorm: {
      title: 'Today is raining',
      subtitle: 'Stay inside if possible',
    },
    drizzle: {
      title: 'Today is raining',
      subtitle: 'Stay inside if possible',
    },
    rain: {
      title: 'Today is raining',
      subtitle: 'Stay inside if possible',
    },
    clear: {
      title: 'Today the sky is clear',
      subtitle: 'Good oportunity to go out',
    },
  };

  return texts[weather.toLowerCase()] || texts.clear;
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
