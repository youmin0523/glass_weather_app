import { useEffect, useState } from 'react';
import {
  getCurrentWeather,
  getCurrentWeatherByCoords,
} from '../utils/weatherAPI';

const useWeather = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [units, setUnit] = useState('C');

  const fetchWeatherByCity = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const [weatherData] = await Promise.all([getCurrentWeather(city)]);

      setCurrentWeather(weatherData);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Failed to fetch Weather Data',
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByLocation = async () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not Supported by Your Browser');
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      // 내 기기의 현재 위치로 반환
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const weatherData = await getCurrentWeatherByCoords(
            latitude,
            longitude,
          );
          setCurrentWeather(weatherData);
        } catch (error) {
          setError(
            error instanceof Error
              ? error.message
              : 'Failed to fetch Weather Data',
          );
        } finally {
          setLoading(false);
        }
      },
    );
  };
  useEffect(() => {
    fetchWeatherByCity('Seoul');
  }, []);

  const toggleUnit = () => {
    setUnit(units === 'C' ? 'F' : 'C');
  };

  return {
    loading,
    error,
    currentWeather,
    forecast,
    units,
    fetchWeatherByCity,
    fetchWeatherByLocation,
    toggleUnit,
  };
};

export default useWeather;
