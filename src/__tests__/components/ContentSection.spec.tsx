import { render } from '@testing-library/react';

import ContentSection from '../../components/ContentSection';

const mockToggleModal = jest.fn();

jest.mock('../../components/Chart', () => () => {
  return <div data-testid="fake-chart" />;
});

jest.mock('../../hooks/Weather', () => {
  return {
    useWeather: () => ({
      weatherData: {
        location: 'London',
        current: {
          main: 'Clouds',
          temp: `999°`,
          humidity: `888%`,
          wind: `777 km/h`,
          clouds: `666%`,
          pop: `555%`,
          temperatures: null,
        },
        forecast: [
          { dt: new Date(2021, 1, 1).getTime(), temp: '333°' },
          { dt: new Date(2021, 1, 2).getTime(), temp: '332°' },
          { dt: new Date(2021, 1, 3).getTime(), temp: '331°' },
        ],
      },
      toggleModal: mockToggleModal,
    }),
  };
});

describe('ContentSection component', () => {
  beforeEach(() => {
    mockToggleModal.mockClear();
  });

  it('should render the component', () => {
    const { getByTestId } = render(<ContentSection />);

    expect(getByTestId('content-section-test')).toBeTruthy();
  });

  it('should contain 3 subsections', () => {
    const { getByTestId } = render(<ContentSection />);

    const sectionComponent = getByTestId('content-section-test');

    expect(sectionComponent.getElementsByClassName('subsection')).toHaveLength(
      3,
    );
  });

  it('should contain current information on first subsection', () => {
    const { getByTestId } = render(<ContentSection />);

    const sectionComponent = getByTestId('content-section-test');
    const firstSubsection =
      sectionComponent.getElementsByClassName('subsection')[0];

    expect(firstSubsection).toHaveTextContent('Weather details');
    expect(firstSubsection).toHaveTextContent('Clouds');
    expect(firstSubsection).toHaveTextContent('666%');
    expect(firstSubsection).toHaveTextContent('Preciptation');
    expect(firstSubsection).toHaveTextContent('555%');
    expect(firstSubsection).toHaveTextContent('Humidity');
    expect(firstSubsection).toHaveTextContent('888%');
    expect(firstSubsection).toHaveTextContent('Wind');
    expect(firstSubsection).toHaveTextContent('777 km/h');
  });

  it('should contain temperature chart on second subsection', () => {
    const { getByTestId } = render(<ContentSection />);

    const chart = getByTestId('fake-chart');

    expect(chart).toBeTruthy();
  });

  it('should contain forecast information on third subsection', () => {
    const { getByTestId } = render(<ContentSection />);

    const sectionComponent = getByTestId('content-section-test');
    const firstSubsection =
      sectionComponent.getElementsByClassName('subsection')[2];

    expect(firstSubsection).toHaveTextContent('Next days');
    expect(firstSubsection).toHaveTextContent('Wednesday');
    expect(firstSubsection).toHaveTextContent('333°');
    expect(firstSubsection).toHaveTextContent('Thursday');
    expect(firstSubsection).toHaveTextContent('332°');
    expect(firstSubsection).toHaveTextContent('Friday');
    expect(firstSubsection).toHaveTextContent('331°');
  });
});
