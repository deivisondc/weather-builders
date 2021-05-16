import { render, fireEvent, waitFor } from '@testing-library/react';

import DisplaySection from '../../components/DisplaySection';

const mockToggleModal = jest.fn();

jest.mock('../../hooks/Weather', () => {
  return {
    useWeather: () => ({
      weatherData: {
        location: 'London',
        current: {
          temp: '999°',
        },
      },
      toggleModal: mockToggleModal,
    }),
  };
});

describe('DisplaySection component', () => {
  beforeEach(() => {
    mockToggleModal.mockClear();
  });

  it('should render the component', () => {
    const { getByTestId } = render(<DisplaySection />);

    expect(getByTestId('display-section-test')).toBeTruthy();
  });

  it('should display the temperature', () => {
    const { getByText } = render(<DisplaySection />);

    expect(getByText('999°')).toBeTruthy();
  });

  it('should display the city', () => {
    const { getByText } = render(<DisplaySection />);

    expect(getByText('London')).toBeTruthy();
  });

  it('should fire toggle modal event when click the button', async () => {
    const { getByText } = render(<DisplaySection />);

    const buttonComponent = getByText('change');

    fireEvent.click(buttonComponent);

    await waitFor(() => {
      expect(mockToggleModal).toHaveBeenCalledTimes(1);
    });
  });
});
