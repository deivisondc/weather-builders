import { useState, useEffect, useCallback, useRef } from 'react';
import Modal from 'react-modal';
import { FiCheck, FiX } from 'react-icons/fi';

import { useWeather } from '../../hooks/Weather';

import GlassModal from '../GlassModal';
import Button from '../Button';

import styles from './styles.module.scss';

Modal.setAppElement('#__next');

interface ChangeCityModalProps {
  isOpen: boolean;
}

export default function ChangeCityModal({ isOpen }: ChangeCityModalProps) {
  const { hasError, toggleModal, fetchWeatherData } = useWeather();

  const [location, setLocation] = useState('');

  const inputRef = useRef(null);

  const handleFetchCityWeather = useCallback(
    async e => {
      e.preventDefault();
      await fetchWeatherData(location);
    },
    [fetchWeatherData, location],
  );

  const handleRequestClose = useCallback(() => {
    setLocation('');
    toggleModal();
  }, [toggleModal]);

  const handleAfterOpen = useCallback(() => {
    inputRef.current.focus();
  }, [inputRef]);

  useEffect(() => {
    if (isOpen && !hasError) {
      setLocation('');
    }
  }, [isOpen, hasError]);

  return (
    <GlassModal
      square={false}
      isOpen={isOpen}
      onRequestClose={handleRequestClose}
      onAfterOpen={handleAfterOpen}
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
      shouldFocusAfterRender
    >
      <form className={styles.container} onSubmit={handleFetchCityWeather}>
        <input
          ref={inputRef}
          placeholder="Enter the city name"
          onChange={e => setLocation(e.target.value)}
          value={location}
        />

        <footer>
          <Button type="submit">
            <FiCheck size={16} />
            Select
          </Button>
          <Button onClick={toggleModal}>
            <FiX size={16} />
            Cancel
          </Button>
        </footer>
      </form>
    </GlassModal>
  );
}
