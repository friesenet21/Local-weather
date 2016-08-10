import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <App ip='http://ip-api.com/json' weather='http://api.openweathermap.org/data/2.5/weather?appid=b2a6681590bccccae332ee769dd2826b&units=metric&lat=' credit="http://codepen.io/joshbader/pen/EjXgqr" />,
  document.getElementById('root')
);
