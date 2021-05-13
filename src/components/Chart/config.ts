export default {
  colors: ['#222'],
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: '#222',
  },
  grid: {
    show: false,
  },
  markers: {
    size: 5,
    strokeWidth: 2,
  },
  dataLabels: {
    enabled: true,
    offsetY: -10,
    background: {
      enabled: false,
      dropShadow: {
        enabled: false,
      },
    },
    style: {
      colors: ['#222'],
    },
    formatter(value) {
      return `${value}°`;
    },
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    axisBorder: {
      color: '#222',
    },
    axisTicks: {
      color: '#222',
    },
    categories: [],
    labels: {
      style: {
        fontSize: '0.6rem',
        fontWeight: 600,
      },
    },
  },
  yaxis: {
    show: false,
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    colors: ['#222'],
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
};
