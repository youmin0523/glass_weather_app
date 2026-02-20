import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// https://api.openweathermap.org/data/2.5/weather?lat=37.56&lon=127.978&appid=50cdc13760b1e3ccec5e885fc22cab2c

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
