import { render, fireEvent, waitFor } from '@testing-library/react';

import ChangeCityModal from '../../components/ChangeCityModal';

const mockToggleModal = jest.fn();
const mockFetchWeatherData = jest.fn();

jest.mock('../../hooks/Weather', () => {
  return {
    useWeather: () => ({
      hasError: true,
      toggleModal: mockToggleModal,
      fetchWeatherData: mockFetchWeatherData,
    }),
  };
});

describe('ChangeCityModal component', () => {
  beforeEach(() => {
    mockToggleModal.mockClear();
    mockFetchWeatherData.mockClear();
  });

  it('should render the component', () => {
    const { getByTestId } = render(<ChangeCityModal isOpen />);

    const modalComponent = getByTestId('changeCityModal-test');

    expect(modalComponent).toBeTruthy();
  });

  it('should contain an input and two buttons', () => {
    const { getByTestId } = render(<ChangeCityModal isOpen />);

    const modalComponent = getByTestId('changeCityModal-test');

    expect(modalComponent.getElementsByTagName('input')).toHaveLength(1);
    expect(modalComponent.getElementsByTagName('button')).toHaveLength(2);
  });

  it('should fire fetch event when clicking the select button', async () => {
    const { getByText, getByPlaceholderText } = render(
      <ChangeCityModal isOpen />,
    );

    const inputComponent = getByPlaceholderText('Enter the city name');
    const selectButtonComponent = getByText('select');

    fireEvent.change(inputComponent, { target: { value: 'Bauru' } });
    fireEvent.click(selectButtonComponent);

    await waitFor(() => {
      expect(mockFetchWeatherData).toHaveBeenCalledTimes(1);
    });
  });

  it('should fire toggle modal event when clicking the cancel button', async () => {
    const { getByText, getByPlaceholderText } = render(
      <ChangeCityModal isOpen />,
    );

    const inputComponent = getByPlaceholderText('Enter the city name');
    const selectButtonComponent = getByText('cancel');

    fireEvent.change(inputComponent, { target: { value: 'Bauru' } });
    fireEvent.click(selectButtonComponent);

    await waitFor(() => {
      expect(mockToggleModal).toHaveBeenCalledTimes(1);
    });
  });

  it('should display erro when search for invalid city', async () => {
    const { getByText, getByPlaceholderText } = render(
      <ChangeCityModal isOpen />,
    );

    const inputComponent = getByPlaceholderText('Enter the city name');
    const selectButtonComponent = getByText('select');

    fireEvent.change(inputComponent, { target: { value: 'Test City 123' } });
    fireEvent.click(selectButtonComponent);

    await waitFor(() => {
      expect(mockFetchWeatherData).toHaveBeenCalledTimes(1);
    });

    expect(getByText('City not found.')).toBeTruthy();
  });
});
