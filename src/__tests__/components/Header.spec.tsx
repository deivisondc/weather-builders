import { render, fireEvent, waitFor } from '@testing-library/react';

import Header from '../../components/Header';

const mockToggleModal = jest.fn();

jest.mock('../../hooks/Weather', () => {
  return {
    useWeather: () => ({
      weatherData: {
        location: 'London',
      },
      toggleModal: mockToggleModal,
    }),
  };
});

describe('Header component', () => {
  beforeEach(() => {
    mockToggleModal.mockClear();
  });

  it('should render the component', () => {
    const { getByText } = render(<Header />);

    const headerComponent = getByText('City');

    expect(headerComponent).toBeTruthy();
  });

  it('should display the selected city', () => {
    const { getByText } = render(<Header />);

    const h2Component = getByText('London');

    expect(h2Component).toBeTruthy();
  });

  it('should fire toggle modal event when click the button', async () => {
    const { getByText } = render(<Header />);

    const buttonComponent = getByText('change');

    fireEvent.click(buttonComponent);

    await waitFor(() => {
      expect(mockToggleModal).toHaveBeenCalledTimes(1);
    });
  });
});
