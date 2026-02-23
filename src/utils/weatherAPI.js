const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;
const GEO_URL = import.meta.env.VITE_GEO_URL;

// GET Current Weather Data
export const getCurrentWeather = async (city) => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`,
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(
          `city ${city} not found, Please Check the Spelling and Try Again.`,
        );
      } else if (response.status === 401) {
        throw new Error(
          `Invalid API Key, Please Check Your API Key and Try Again.`,
        );
      } else {
        throw new Error(
          `Weather Service is temporarily unavailable, Please Try Again Later.`,
        );
      }
    }

    const data = await response.json();

    if (!data.dt) {
      // 현재 시간을 밀리초 단위에서 초단위로 표시하고 소숫점 날림
      data.dt = Math.floor(Date.now() / 1000);
    }

    return data;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error(
        'Network Error, Please Check Your Internet Connection and Try Again.',
      );
    }
    throw error;
  }
};

// GET Search City Data List
export const searchCities = async (query) => {
  try {
    const response = await fetch(
      `${GEO_URL}/direct?q=${query}&limit=5&appid=${API_KEY}`,
    );

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error(
          `Invalid API Key, Please Check Your API Key and Try Again.`,
        );
      } else {
        throw new Error(
          `Weather Service is temporarily unavailable, Please Try Again Later.`,
        );
      }
    }

    const data = await response.json();

    return data.map((city) => ({
      name: city.name,
      lat: city.lat,
      lon: city.lon,
      country: city.country,
      state: city.state || '',
    }));
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error(
        'Network Error, Please Check Your Internet Connection and Try Again.',
      );
    }
    throw error;
  }
};
