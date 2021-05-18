import { useState, useEffect, useCallback, useRef } from 'react';
import { FiCheck, FiX } from 'react-icons/fi';
import { IoCloseCircleOutline } from 'react-icons/io5';

import { useWeather } from '../../hooks/Weather';

import GlassModal from '../GlassModal';
import Button from '../Button';

import styles from './styles.module.scss';

interface ChangeCityModalProps {
  isOpen: boolean;
}

export default function ChangeCityModal({ isOpen }: ChangeCityModalProps) {
  const { hasError, setHasError, toggleModal, fetchWeatherData } = useWeather();

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
    setHasError(false);
  }, [toggleModal, setHasError]);

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
      testId="changeCityModal-test"
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
        {hasError && (
          <div className={styles.notFound}>
            <IoCloseCircleOutline size={20} />
            <span>City not found.</span>
          </div>
        )}

        <footer>
          <Button type="submit">
            <FiCheck size={16} />
            select
          </Button>
          <Button onClick={toggleModal}>
            <FiX size={16} />
            cancel
          </Button>
        </footer>
      </form>
    </GlassModal>
  );
}
