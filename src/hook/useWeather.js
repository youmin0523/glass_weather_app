import { useEffect, useState } from 'react';
import { getCurrentWeather } from '../utils/weatherAPI';

const useWeather = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [unit, setUnit] = useState('C');

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

  useEffect(() => {
    fetchWeatherByCity('Seoul');
  }, []);

  return { loading, error, currentWeather, forecast, unit, fetchWeatherByCity };
};

export default useWeather;
