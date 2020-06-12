import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
//E aqui que transforma a div.root em App.tsx
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') //estou mandado para rodar app dentro do div root
);

